/* 
CASOS DE USO (REGRAS DE NEGÓCIO) DE CRIAÇÃO VINDOS DO REPOSITORY COM VALIDAÇÕES E USO DOS MÉTODOS 
*/
import type { RegisterUseCaseParams } from '@/core/interfaces/RegisterUseCaseParams';
import type { RegisterUseCaseResponse } from '@/core/interfaces/RegisterUseCaseResponse';
import type { PrismaUsersRepository } from '@/infrastructure/db/repositories/prisma/PrismaUsersRepository';

import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error';

import { hash } from 'bcryptjs';

export class RegisterUseCase {
    // esse constructor sempre recebe o repository
    constructor(private prismaUsersRepository: PrismaUsersRepository) {}

    async execute({
        name,
        email,
        password,
    }: RegisterUseCaseParams): Promise<RegisterUseCaseResponse> {
        // faz o hash da senha
        const password_hash = await hash(password, 6);

        // valida se tenta criar usuário com email já cadastrado
        const userWithSameEmail =
            await this.prismaUsersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        // chama o método de criação do usuário e o cria
        const user = await this.prismaUsersRepository.create({
            name,
            email,
            password_hash,
        });

        return {
            user,
        };
    }
}
