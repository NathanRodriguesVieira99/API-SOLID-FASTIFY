/*
ROTAS SÃO CRIADAS (E DOCUMENTAS NO SWAGGER) CHAMANDO OS CONTROLLERS E COLOCANDO O NOME DO ENDPOINT
*/

import type { FastifyTypedInstance } from '@/_types/FastifyTypedInstance';

import { z } from 'zod';
import { registerBodySchema } from '@/validators/registerBodySchema';

import { deleteUserById } from '@/controllers/delete';
import { register } from '@/controllers/register';

export const Routes = async (server: FastifyTypedInstance) => {
    server.post(
        '/users',
        {
            schema: {
                tags: ['users'],
                description: 'create user',
                body: registerBodySchema,
                response: {
                    201: z.null().describe('user created'),
                },
            },
        },
        register
    );
    server.delete(
        '/users/:id',
        {
            schema: {
                tags: ['users'],
                description: 'delete user',
                response: {
                    204: z.null().describe('user deleted'),
                },
            },
        },
        deleteUserById
    );
};
