import { PrismaClient } from '@/generated/prisma/client';

declare global {
  var prisma: PrismaClient;
}

let prisma: PrismaClient = global.prisma;

if (!prisma) {
  prisma = new PrismaClient();
}

export default prisma;
