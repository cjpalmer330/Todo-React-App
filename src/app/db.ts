import { PrismaClient } from "@prisma/client"

//creates a singleton to ensure we don't create many clients for one user
const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = 
globalForPrisma.prisma ?? new PrismaClient({ log: ["query"],})
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma