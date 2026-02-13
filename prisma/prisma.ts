// import { PrismaClient } from "@/prisma/generated/prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";

// const adapter = new PrismaPg({
//   connectionString: process.env.API_SECRET_PATH
// });

// export const prisma = new PrismaClient({
//   adapter
// });

// import { PrismaClient } from "@/prisma/generated/prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     adapter: new PrismaPg({
//       connectionString: `${process.env.API_SECRET_PATH}?connection_limit=10&pool_timeout=10`
//     }),
//     log: ["error"]
//   });
// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

// process.on("beforeExit", async () => {
//   await prisma.$disconnect();
// });

// process.on("SIGINT", async () => {
//   await prisma.$disconnect();
//   process.exit(0);
// });

// process.on("SIGTERM", async () => {
//   await prisma.$disconnect();
//   process.exit(0);
// });
import { PrismaClient } from "@/prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prismaClientSingleton = () => {
  const pool = new PrismaPg({ connectionString: process.env.API_SECRET_PATH! });
  return new PrismaClient({ adapter: pool });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
