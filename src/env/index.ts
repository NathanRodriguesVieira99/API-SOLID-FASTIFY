/* 
VALIDAÇÃO DAS VARIÁVEIS DE AMBIENTE COM ZOD E DOTENV
*/
import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.error('❌ invalid environment variable', _env.error?.format());

    throw new Error('invalid environment variables');
}

export const env = _env.data;
