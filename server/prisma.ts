import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const { user, token } = prisma;

export default prisma;
