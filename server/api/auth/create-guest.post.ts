import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async () => {
  const guestUser = await prisma.user.create({
    data: { role: "guest", username: `guest_${Date.now()}` }
  });
  return guestUser;
});
