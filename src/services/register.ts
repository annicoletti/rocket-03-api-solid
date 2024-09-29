import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface RegisterServiceRequest {
    nome: string,
    email: string,
    password: string
}

export const registerServiceExample2 = async ({ nome, email, password }: RegisterServiceRequest) => {
    registerService(nome, password, email);
}

export const registerService = async (nome: string, password: string, email: string) => {

    const password_hash = await hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userWithSameEmail) {
        throw new Error('E-mail already exists.');
    }


    await prisma.user.create({
        data: {
            nome,
            email,
            password_hash,
        }
    });
}