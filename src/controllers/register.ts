/*
CONTROLLER EXTRAI OS DADOS DO BODY DA REQUISIÇÃO, CHAMA OS REPOSITORIES E SERVICES E OS PROCESSA PARA HTTP
*/

import { UsersRepository } from '@/repositories/UsersRepository';
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error';
import { RegisterUseCase } from '@/services/register';
import { registerBodySchema } from '@/validators/registerBodySchema';
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function register(request: FastifyRequest, reply: FastifyReply) {
    // extrai os dados validados do body da request
    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        // chama o repository
        const usersRepository = new UsersRepository();
        // injeta o repository no RegisterUseCase
        const registerUseCase = new RegisterUseCase(usersRepository);

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
