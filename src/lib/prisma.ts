import { PrismaClient } from "@prisma/client";
import { env } from "../env";

export const prisma = new PrismaClient({
    //logando queries em ambiente dev
    log: env.NODE_ENV === 'dev' ? ['query'] : []
})