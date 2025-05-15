import type { FastifyTypedInstance } from '@/_types/FastifyTypedInstance';

import { z } from 'zod';

export async function HealthyRoute(server: FastifyTypedInstance) {
    server.get(
        '/healthy',
        {
            schema: {
                tags: ['healthy '],
                description: ' checking project healthy ',
                response: {
                    200: z
                        .object({
                            status: z.string(),
                            message: z.string(),
                        })
                        .describe('server is running'),
                },
            },
        },
        async () => {
            return { status: 'ok', message: 'Server is running' };
        }
    );
}
