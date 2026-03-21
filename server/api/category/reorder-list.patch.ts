import { prisma } from "@/prisma/prisma";
import { defineEventHandler } from "h3";

interface ICategoryOrderPayload {
  id: number;
  listPosition: number;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ payload: ICategoryOrderPayload[] }>(event);

  const { payload } = body;

  console.log(payload, "payload from reorder category controller");

  if (!Array.isArray(payload)) {
    return {
      statusCode: 400,
      message: "Invalid payload"
    };
  }

  const ids = payload.map((i) => i.id);

  const existing = await prisma.category.findMany({
    where: { id: { in: ids } },
    select: { id: true }
  });

  if (existing.length !== ids.length) {
    return {
      statusCode: 400,
      message: "Some categories not found"
    };
  }

  try {
    const updateList = await prisma.$transaction(
      payload.map((item: ICategoryOrderPayload) =>
        prisma.category.update({
          where: { id: item.id },
          data: { listPosition: item.listPosition }
        })
      )
    );

    console.log(updateList, "updateList from reorder category controller");

    return {
      statusCode: 200,
      message: "Category list was reordered successfully"
    };
  } catch (err) {
    console.error("Error updating category order", err);
    return {
      statusCode: 500,
      message: "An error occurred while reordering categories"
    };
  }
});
