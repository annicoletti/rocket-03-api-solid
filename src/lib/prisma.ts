import { env } from "@/env";
import { PrismaClient } from "@prisma/client";


export const prisma = new PrismaClient({
    //logando queries em ambiente dev
    log: env.NODE_ENV === 'dev' ? ['query'] : []
})