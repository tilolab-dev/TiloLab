import { prisma } from "@/prisma/prisma";
import { eventHandler, readBody } from "h3";

export default eventHandler(async (event: any) => {
  const body = await readBody(event);

  console.log(body, "body");

  if (!body) {
    return { statusCode: 400, message: "No data received" };
  }

  const { orderItems, shippingInfo, totalPrice, paymentMethod, email, phoneNumber } = body;

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

      for (const item of orderItems) {
        const product: any = await tx.product.findUnique({
          where: { id: item.productId }
        });

        if (!product) {
          throw createError({
            statusCode: 404,
            message: "Товар не знайдено"
          });
        }

        const checkAvailableProduct = product.stockValue - product.stockReserved;

        if (checkAvailableProduct < item.quantity) {
          throw createError({
            statusCode: 400,
            message: "Недостатньо товару на складі"
          });
        }

        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockReserved: {
              increment: item.quantity
            }
          }
        });
      }

      // CREATE ORDER

      const newOrder = await tx.order.create({
        data: {
          userId,
          status: "NEW",
          paymentMethod,
          totalPrice,
          orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          expiresAt: new Date(Date.now() + 15 * 60_000),
          orderItems: {
            create: orderItems.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity ?? 1
            }))
          },
          shippingInfo: {
            create: {
              recipient: shippingInfo.recipient as string,
              phoneNumber: shippingInfo.phoneNumber,
              deliveryMethod: shippingInfo.deliveryMethod,
              postOffice: shippingInfo.postOffice,
              postomat: shippingInfo.postomat,
              city: shippingInfo.city,
              country: shippingInfo.country
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

    // const createNewOrder = await prisma.order.create({
    //   data: {
    //     paymentMethod: body.paymentMethod,
    //     totalPrice: body.totalPrice,
    //     orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    //     orderItems: {
    //       create: body.orderItems.map((item: any) => ({
    //         productId: item.product,
    //         quantity: item.quantity ?? 1
    //       }))
    //     },
    //     shippingInfo: {
    //       create: {
    //         recipient: body.shippingInfo.recipient as string,
    //         phoneNumber: body.shippingInfo.phoneNumber,
    //         deliveryMethod: body.shippingInfo.deliveryMethod,
    //         postOffice: body.shippingInfo.postOffice,
    //         postomat: body.shippingInfo.postomat,
    //         city: body.shippingInfo.city,
    //         country: body.shippingInfo.country
    //       }
    //     }
    //   }
    // });
    // console.log(createNewOrder, "createNewOrder");
    // return {
    //   statusCode: 200,
    //   message: "Order created successfully",
    //   data: createNewOrder
    // };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      message: "Помилка при створенні замовлення"
    };
  }
});

// export default newOrder;

// try {

//   const createNewOrder = await prisma.order.create({
//     data: {
//       paymentMethod: body.paymentMethod,
//       totalPrice: body.totalPrice,
//       orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
//       orderItems: {
//         create: body.orderItems.map((item: any) => ({
//           productId: item.product,
//           quantity: item.quantity ?? 1
//         }))
//       },
//       shippingInfo: {
//         create: {
//           recipient: body.shippingInfo.recipient as string,
//           phoneNumber: body.shippingInfo.phoneNumber,
//           deliveryMethod: body.shippingInfo.deliveryMethod,
//           postOffice: body.shippingInfo.postOffice,
//           postomat: body.shippingInfo.postomat,
//           city: body.shippingInfo.city,
//           country: body.shippingInfo.country
//         }
//       }
//     }
//   });

//   console.log(createNewOrder, "createNewOrder");

//   return {
//     statusCode: 200,
//     message: "Order created successfully",
//     data: createNewOrder
//   };
// } catch (err) {
//   console.error(err);
//   return {
//     statusCode: 500,
//     message: "Internal server error"
//   };
// }
