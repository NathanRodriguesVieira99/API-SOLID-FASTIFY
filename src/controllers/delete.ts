import type { FastifyReply, FastifyRequest } from 'fastify';

import { paramsSchema } from '@/schemas/paramsSchema';

import { UsersRepository } from '@/repositories/prisma/UsersRepository';

import { DeleteUseCase } from '@/services/delete';

export async function deleteUserById(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        // chama o repository
        const usersRepository = new UsersRepository();
        // injeta o repository no DeleteUseCase
        const deleteUseCase = new DeleteUseCase(usersRepository);

        // busca o ID para passar de parâmetro ao execute
        const { id } = paramsSchema.parse(request.params);

        // busca o user que vai ser deletado pelo ID
        await deleteUseCase.execute(id);
    } catch (error) {
        // TODO criar uma validação melhor
        console.error(error, 'error on delete user');
    }

    // se não houver erros deleta com sucesso
    return reply.status(204).send();
}
