import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "../../services/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "../../services/factories/make-authenticate-use-case";

export const authenticate = async (request: FastifyRequest, response: FastifyReply) => {

    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const authenticateService = makeAuthenticateUseCase();

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