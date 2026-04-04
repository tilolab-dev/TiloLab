import { prisma } from "@/prisma/prisma";
import { eventHandler, readBody } from "h3";

export default eventHandler(async (event: any) => {
  const body = await readBody(event);

  if (!body) {
    return { statusCode: 400, message: "No data received" };
  }

  // const { orderItems, shippingInfo, totalPrice, paymentMethod, email, phoneNumber } = body;
  const { orderItems, shippingInfo, paymentMethod, email, phoneNumber } = body;

  const authUserId: number | null = event.context.auth?.user?.id ?? null;

  try {
    const order = await prisma.$transaction(async (tx) => {
      // FIND USER
      let userId: number | null = authUserId;

      if (!userId) {
        let user = null;

        if (email) {
          user = await tx.user.findUnique({
            where: { email }
          });
        }

        if (!user && phoneNumber) {
          user = await tx.user.findFirst({
            where: { phoneNumber }
          });
        }

        if (!user) {
          user = await tx.user.create({
            data: {
              email: email ?? null,
              phoneNumber: phoneNumber ?? null,
              role: "guest"
            }
          });
        }

        userId = user.id;
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

      const productMap = new Map(products.map((p) => [p.id, p]));
      const optionMap = new Map(options.map((o) => [o.id, o]));

      let realTotalPrice = 0;
      const enrichedOrderItems: any[] = [];

      // for (const item of orderItems) {
      //   if (item.optionId) {
      //     const option = await tx.productOptions.findUnique({
      //       where: { id: item.optionId }
      //     });

      //     if (!option) {
      //       throw createError({
      //         statusCode: 404,
      //         message: "Опцію не знайдено"
      //       });
      //     }

      //     if (option.optionId !== item.productId) {
      //       throw createError({
      //         statusCode: 400,
      //         message: "Опція не належить товару"
      //       });
      //     }

      //     const available = (option.optionStock ?? 0) - (option.optionReserved ?? 0);

      //     if (available < item.quantity) {
      //       throw createError({
      //         statusCode: 400,
      //         message: "Недостатньо товару (опція)"
      //       });
      //     }

      //     await tx.productOptions.update({
      //       where: { id: item.optionId },
      //       data: {
      //         optionReserved: {
      //           increment: item.quantity
      //         }
      //       }
      //     });

      //     continue;
      //   }

      //   const product = await tx.product.findUnique({
      //     where: { id: item.productId }
      //   });

      //   if (!product) {
      //     throw createError({
      //       statusCode: 404,
      //       message: "Товар не знайдено"
      //     });
      //   }

      //   const available = (product.stockValue ?? 0) - (product.stockReserved ?? 0);

      //   if (available < item.quantity) {
      //     throw createError({
      //       statusCode: 400,
      //       message: "Недостатньо товару на складі"
      //     });
      //   }

      //   await tx.product.update({
      //     where: { id: item.productId },
      //     data: {
      //       stockReserved: {
      //         increment: item.quantity
      //       }
      //     }
      //   });
      // }

      // CREATE ORDER

      // console.log(orderItems, "orderItems");

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

        realTotalPrice += Math.floor(price * item.quantity);
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
          totalPrice: realTotalPrice,
          orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          expiresAt: new Date(Date.now() + 15 * 60_000),
          // orderItems: {
          //   create: orderItems.map((item: any) => ({
          //     productId: item.productId,
          //     optionId: item.optionId ?? null,
          //     quantity: item.quantity ?? 1,
          //     price: item.price ?? null,
          //     name: item.title
          //   }))
          // },
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
      message: "Помилка при створенні замовлення"
    };
  }
});
