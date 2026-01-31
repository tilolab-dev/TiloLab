import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async (event) => {
  const { id, status } = await readBody(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Order id is required"
    });
  }
  try {
    const updateOrder = await prisma.order.update({
      where: { id: id },
      data: {
        status: status
      }
    });
    console.log(updateOrder, "updateOrder");
    return {
      statusCode: 200,
      data: updateOrder
    };
  } catch (err) {
    console.error("ERROR UPDATE ORDER", err);
    return createError({
      statusCode: 500,
      statusMessage: "Error updating order"
    });
  }
});
