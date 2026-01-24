import { prisma } from "@/prisma/prisma";
import { eventHandler, readBody } from "h3";

export default eventHandler(async (event: any) => {
  const body = await readBody(event);

  console.log(body, "body");

  if (!body) {
    return { statusCode: 400, message: "No data received" };
  }

  try {
    const createNewOrder = await prisma.order.create({
      data: {
        paymentMethod: body.paymentMethod,
        totalPrice: body.totalPrice,
        orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        orderItems: {
          create: body.orderItems.map((item: any) => ({
            productId: item.product,
            quantity: item.quantity ?? 1
          }))
        },
        shippingInfo: {
          create: {
            recipient: body.shippingInfo.recipient as string,
            phoneNumber: body.shippingInfo.phoneNumber,
            deliveryMethod: body.shippingInfo.deliveryMethod,
            postOffice: body.shippingInfo.postOffice,
            postomat: body.shippingInfo.postomat,
            city: body.shippingInfo.city,
            country: body.shippingInfo.country
          }
        }
      }
    });

    console.log(createNewOrder, "createNewOrder");

    return {
      statusCode: 200,
      message: "Order created successfully",
      data: createNewOrder
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      message: "Internal server error"
    };
  }
});

// export default newOrder;
