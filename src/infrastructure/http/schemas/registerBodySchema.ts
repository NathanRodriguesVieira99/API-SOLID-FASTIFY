import { z } from 'zod';

// valida o body do usuário criado com zod
export const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
});
