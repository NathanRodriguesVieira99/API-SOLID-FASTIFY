import type { FastifyReply, FastifyRequest } from 'fastify';

import { UsersRepository } from '@/repositories/UsersRepository';

import { ListAllUsersUseCase } from '@/services/listAll';

export async function listAllUsers(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        // chama o repository
        const usersRepository = new UsersRepository();
        // injeta o repository no DeleteUseCase
        const listAllUsersUseCase = new ListAllUsersUseCase(usersRepository);

        // busca os users para listar
        const { users } = await listAllUsersUseCase.execute();

        return reply.status(200).send({ users });
    } catch (error) {
        // TODO criar validação melhor
        console.error(error);
        return reply.status(500).send({
            error: 'internal server error',
            message: 'Failed to list user',
        });
    }
}
