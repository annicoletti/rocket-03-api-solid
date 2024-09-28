import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs"
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const register = async (request: FastifyRequest, response: FastifyReply) => {

    const registryBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registryBodySchema.parse(request.body);

    const password_hash = await hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userWithSameEmail) {
        return response.status(409).send();
    }

    await prisma.user.create({
        data: {
            nome: name,
            email,
            password_hash,
        }
    });

    return response.status(201).send();
}