import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { RegisterService } from "@/services/register";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const register = async (request: FastifyRequest, response: FastifyReply) => {

    const registryBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registryBodySchema.parse(request.body);

    try {

        const userRepository = new PrismaUsersRepository();
        const registerService = new RegisterService(userRepository);

        await registerService.execute({
            nome: name,
            email,
            password
        });

    } catch (error) {
        return response.status(409).send();
    }

    return response.status(201).send();
}