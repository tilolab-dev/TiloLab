import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { guestId, userId } = body;

  console.log(body, "body");

  await prisma.order.updateMany({
    where: { userId: guestId },
    data: { userId }
  });

  await prisma.user.delete({ where: { id: guestId } });

  return { success: true };
});
