import 'dotenv/config'
import { z } from 'zod'

//process.env: {NODE_ENV: 'dev', ...}

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('production'),
    PORT: z.coerce.number().default(3333), // coerce converte o valor que for para um numero
});

const _env = envSchema.safeParse(process.env);

if (_env.success == false) {
    console.error('Invalid environment variables.', _env.error.format())
    throw new Error('Invalid environment variables.');
}

export const env = _env.data