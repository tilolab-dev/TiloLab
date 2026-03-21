import { prisma } from "@/prisma/prisma";
import { defineEventHandler } from "h3";

interface IProductOrderPayload {
  id: number;
  listPosition: number;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ payload: IProductOrderPayload[] }>(event);

  const { payload } = body;

  console.log(payload, "payload from reorder product controller");

  if (!Array.isArray(payload)) {
    return {
      statusCode: 400,
      message: "Invalid payload"
    };
  }

  const ids = payload.map((i) => i.id);

  const existing = await prisma.product.findMany({
    where: { id: { in: ids } },
    select: { id: true }
  });

  if (existing.length !== ids.length) {
    return {
      statusCode: 400,
      message: "Some products not found"
    };
  }

  try {
    const updateList = await prisma.$transaction(
      payload.map((item: IProductOrderPayload) =>
        prisma.product.update({
          where: { id: item.id },
          data: { listPosition: item.listPosition }
        })
      )
    );

    console.log(updateList, "updateList from reorder product controller");

    return {
      statusCode: 200,
      message: "Product list was reordered successfully"
    };
  } catch (err) {
    console.error("Error updating product order", err);
    return {
      statusCode: 500,
      message: "An error occurred while reordering products"
    };
  }
});
