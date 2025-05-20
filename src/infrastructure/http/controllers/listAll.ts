import type { FastifyReply, FastifyRequest } from 'fastify';

import { ListAllUsersUseCase } from '@/core/useCases/listAll';
import { PrismaUsersRepository } from '@/infrastructure/db/repositories/prisma/PrismaUsersRepository';
import { UsersNoExistsError } from '@/shared/errors/users-no-exist-error';

export async function listAllUsers(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        // chama o repository
        const prismaUsersRepository = new PrismaUsersRepository();
        // injeta o repository no DeleteUseCase
        const listAllUsersUseCase = new ListAllUsersUseCase(
            prismaUsersRepository
        );

        // busca os users para listar
        const { users } = await listAllUsersUseCase.execute();

        // se não houver erros lista com sucesso
        return reply.status(200).send({ users });
    } catch (error) {
        // verifica todos os possíveis erros
        if (error instanceof UsersNoExistsError) {
            return reply.status(404).send({ message: error.message });
        }
        console.error(error);
        return reply.status(500).send({
            error: 'internal server error',
            message: 'Failed to list user',
        });
    }
}
