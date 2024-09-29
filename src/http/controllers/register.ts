import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "../../services/errors/user-already-exists-error";
import { makeRegisterUseCase } from "../../services/factories/make-register-use-casrs";

export const register = async (request: FastifyRequest, response: FastifyReply) => {

    const registryBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registryBodySchema.parse(request.body);

    try {

        const registerService = makeRegisterUseCase();

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