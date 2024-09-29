import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";
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
        if (error instanceof UserAlreadyExistsError) {
            return response.status(409).send({
                message: error.message,
            });
        }

        return response.status(500).send(); //TODO: fix me

    }

    return response.status(201).send();
}