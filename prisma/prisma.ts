import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.API_SECRET_PATH
});

export const prisma = new PrismaClient({
  adapter
});
