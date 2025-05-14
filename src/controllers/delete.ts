import type { FastifyReply, FastifyRequest } from 'fastify';

import { UsersRepository } from '@/repositories/UsersRepository';

import { DeleteUseCase } from '@/services/delete';

export async function deleteUserById(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { id } = request.params as { id: string };

    try {
        // chama o repository
        const usersRepository = new UsersRepository();
        // injeta o repository no DeleteUseCase
        const deleteUseCase = new DeleteUseCase(usersRepository);

        await deleteUseCase.execute(id);
    } catch (error) {
        // TODO criar uma validação melhor
        console.error(error, 'error on delete user');
    }

    return reply.status(204).send();
}
