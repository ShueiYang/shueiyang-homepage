import { PrismaClient } from "@prisma/client";

/*
  Solution to instantiate a single instance of PrismaClient
  and save it on the globalThis object.
*/

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
