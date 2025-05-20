/*
ENDPOINTS  CRUD DE USERS
*/

import { z } from 'zod';

import type { FastifyTypedInstance } from '@/@types/FastifyTypedInstance';
import { deleteUserById } from '@/infrastructure/http/controllers/delete';
import { listAllUsers } from '@/infrastructure/http/controllers/listAll';
import { register } from '@/infrastructure/http/controllers/register';
import { registerBodySchema } from '@/infrastructure/http/schemas/registerBodySchema';

export async function UserRoutes(server: FastifyTypedInstance) {
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
    server.get(
        '/users',
        {
            schema: {
                tags: ['users'],
                description: 'list all users',
                response: {
                    200: z.object({
                        users: z.array(
                            z.object({
                                id: z.string().uuid(),
                                name: z.string(),
                                email: z.string().email(),
                                created_at: z.date(),
                                updated_at: z.date(),
                            })
                        ),
                    }),
                },
            },
        },
        listAllUsers
    );
}
