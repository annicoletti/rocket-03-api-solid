import fastify from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";

export const app = fastify();

app.post('/users', async (request, response) => {

    const registryBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registryBodySchema.parse(request.body);

    await prisma.user.create({
        data: {
            nome: name,
            email,
            password_hash: password
        }
    });

    return response.status(201).send();
});