import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "../../services/authenticate"
import { InvalidCredentialsError } from "../../services/errors/invalid-credentials-error";

export const authenticate = async (request: FastifyRequest, response: FastifyReply) => {

    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const userRepository = new PrismaUsersRepository();
        const authenticateService = new AuthenticateService(userRepository);

        await authenticateService.execute({
            email,
            password
        });

    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return response.status(400).send({ message: error.message, });
        }
        return response.status(500).send(); //TODO: fix me
    }

    return response.status(200).send();
}