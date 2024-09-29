import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _request, response) => {
    if (error instanceof ZodError) {
        return response.status(400).send({
            message: 'Validation error.',
            issues: error.format(),
        })
    }

    if (env.NODE_ENV !== "production") {
        console.log(error);
    } else {
        //TODO: Hwere we should log to an external tool like Datadog/NewRelic/Sentry
    }

    return response.status(500).send({
        message: 'Internal server error',
    })
})