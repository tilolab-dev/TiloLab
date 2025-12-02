
// import { PrismaClient } from '@prisma/client';

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// export const prisma = global.prisma ?? new PrismaClient();
// if (!global.prisma) {
//   global.prisma = prisma;
// }

// export default prisma;

import { PrismaClient } from '@/prisma/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.api_secret_path
});

export const prisma = new PrismaClient({ adapter });



