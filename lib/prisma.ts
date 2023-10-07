import { PrismaClient } from '@prisma/client';

const prismaClientSignleton = () => {
    return new PrismaClient();
};

type prismaClientSignleton = ReturnType<typeof prismaClientSignleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: prismaClientSignleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSignleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
