import { prisma } from "@/prisma/prisma";
import { eventHandler, readBody } from "h3";

export default eventHandler(async (event: any) => {
  const body = await readBody(event);

  if (!body) {
    return { statusCode: 400, message: "No data received" };
  }

  // const { orderItems, shippingInfo, totalPrice, paymentMethod, email, phoneNumber } = body;
  const {
    userId: clientUserId,
    name,
    surname,
    orderItems,
    shippingInfo,
    paymentMethod,
    email,
    phoneNumber,
    promoCode,
    orderComment
  } = body;

  const authUserId: number | null = event.context.auth?.user?.id ?? null;

  try {
    const order = await prisma.$transaction(async (tx) => {
      // FIND USER
      let userId = clientUserId ?? authUserId ?? null;
      let user = null;

      if (userId) {
        user = await tx.user.findUnique({
          where: {
            id: userId
          }
        });
      }

      if (!user) {
        if (email) {
          user = await tx.user.findUnique({
            where: {
              email
            }
          });
        }

        if (!user && phoneNumber) {
          user = await tx.user.findFirst({
            where: {
              phoneNumber
            }
          });
        }

        if (!user) {
          user = await tx.user.create({
            data: {
              email: email ?? null,
              phoneNumber: phoneNumber ?? null,
              username: name ?? null,
              userSurname: surname ?? null,
              fullName: `${name} ${surname}`.trim(),
              role: "guest"
            }
          });
        }

        userId = user.id;
      }

      const updateData: {
        username?: string;
        userSurname?: string;
        fullName?: string;
        phoneNumber?: string;
      } = {};

      if (phoneNumber && user.phoneNumber !== phoneNumber) {
        updateData.phoneNumber = phoneNumber;
      }

      if (!user.username && name) {
        updateData.username = name;
      }

      if (!user.userSurname && surname) {
        updateData.userSurname = surname;
      }

      if (!user.fullName && name && surname) {
        updateData.fullName = `${name} ${surname}`;
      }

      if (Object.keys(updateData).length > 0) {
        user = await tx.user.update({
          where: {
            id: user.id
          },
          data: updateData
        });
      }

      // CHECK AVAILABILITY & RESERVE PRODUCTS

      const productIds = orderItems.filter((i: any) => !i.optionId).map((i: any) => i.productId);

      const optionIds = orderItems.filter((i: any) => i.optionId).map((i: any) => i.optionId);

      const products = await tx.product.findMany({
        where: { id: { in: productIds } }
      });

      const options = await tx.productOptions.findMany({
        where: { id: { in: optionIds } }
      });

      // console.log("PRODUCTS", products);

      const productMap = new Map(products.map((p) => [p.id, p]));
      const optionMap = new Map(options.map((o) => [o.id, o]));

      let realTotalPrice = 0;
      const enrichedOrderItems: any[] = [];

      for (const item of orderItems) {
        let price = 0;
        let name = item.title;

        if (item.optionId) {
          const option = optionMap.get(item.optionId);

          if (!option) {
            throw createError({ statusCode: 404, message: "Опцію не знайдено" });
          }

          if (option.optionId !== item.productId) {
            throw createError({
              statusCode: 400,
              message: "Опція не належить товару"
            });
          }

          const available = (option.optionStock ?? 0) - (option.optionReserved ?? 0);

          if (available < item.quantity) {
            throw createError({
              statusCode: 400,
              message: "Недостатньо товару (опція)"
            });
          }

          if (option.optionPrice == null) {
            throw createError({
              statusCode: 500,
              message: "У опції відсутня ціна"
            });
          }

          price = option.optionPrice ?? 0;

          enrichedOrderItems.push({
            productId: item.productId,
            optionId: item.optionId,
            quantity: item.quantity,
            price,
            name
          });
        } else {
          const product = productMap.get(item.productId);

          if (!product) {
            throw createError({ statusCode: 404, message: "Товар не знайдено" });
          }

          const available = (product.stockValue ?? 0) - (product.stockReserved ?? 0);

          if (available < item.quantity) {
            throw createError({
              statusCode: 400,
              message: "Недостатньо товару"
            });
          }

          if (product.productPrice == null) {
            throw createError({
              statusCode: 500,
              message: "У товару відсутня ціна"
            });
          }

          price = product.productPrice;
          // name = product.title;

          enrichedOrderItems.push({
            productId: item.productId,
            optionId: null,
            quantity: item.quantity,
            price,
            name
          });
        }

        realTotalPrice += price * item.quantity;
      }

      // RESERVE ITEMS

      for (const item of orderItems) {
        if (item.optionId) {
          await tx.productOptions.update({
            where: { id: item.optionId },
            data: {
              optionReserved: {
                increment: item.quantity
              }
            }
          });
        } else {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stockReserved: {
                increment: item.quantity
              }
            }
          });
        }
      }

      const newOrder = await tx.order.create({
        data: {
          userId,
          status: "NEW",
          paymentMethod,
          promoCode: promoCode,
          orderComment: orderComment,
          totalPrice: realTotalPrice,
          orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          expiresAt: new Date(Date.now() + 15 * 60_000),
          orderItems: {
            create: enrichedOrderItems
          },
          shippingInfo: {
            create: {
              recipient: shippingInfo.recipient as string,
              phoneNumber: shippingInfo.phoneNumber,
              deliveryMethod: shippingInfo.deliveryMethod,
              postOffice: shippingInfo.postOffice,
              postomat: shippingInfo.postomat,
              city: shippingInfo.city,
              country: shippingInfo.country,
              NPtypeOfWarehouse: shippingInfo.warehouseType,
              NPcityId: shippingInfo.cityId,
              NPwarehouseId: shippingInfo.postAddressId,
              NPrecipientId: shippingInfo.recipientId,
              NPrecipientContactId: shippingInfo.recipientContactId
            }
          }
        }
      });

      return newOrder;
    });

    return {
      statusCode: 200,
      message: "Order created successfully",
      data: order
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      message: `Помилка при створенні замовлення ${err}`
    };
  }
});
