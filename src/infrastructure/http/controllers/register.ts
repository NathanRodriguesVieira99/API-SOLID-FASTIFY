/*
CONTROLLER EXTRAI OS DADOS DO BODY DA REQUISIÇÃO, CHAMA OS SERVICES COM REPOSITORIES E OS PROCESSA PARA HTTP
*/
import type { FastifyReply, FastifyRequest } from 'fastify';

import { RegisterUseCase } from '@/core/useCases/register';
import { PrismaUsersRepository } from '@/infrastructure/db/repositories/prisma/PrismaUsersRepository';
import { registerBodySchema } from '@/infrastructure/http/schemas/registerBodySchema';
import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error';

export async function register(request: FastifyRequest, reply: FastifyReply) {
    // extrai os dados validados do body da request
    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        // chama o repository
        const prismaUsersRepository = new PrismaUsersRepository();
        // injeta o repository no RegisterUseCase
        const registerUseCase = new RegisterUseCase(prismaUsersRepository);

        // chama o service de criação de usuário
        await registerUseCase.execute({
            name,
            email,
            password,
        });
    } catch (error) {
        // verifica todos os possíveis erros
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message });
        }
        throw error;
    }
    // se não houver erros cria com sucesso
    return reply.status(201).send();
}
