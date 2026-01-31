import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);
  if (!id) return { error: "Guest ID required" };

  const user = await prisma.user.findUnique({ where: { id } });
  return user;
});
