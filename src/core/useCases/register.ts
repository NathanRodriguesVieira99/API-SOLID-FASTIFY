/* 
CASOS DE USO (REGRAS DE NEGÓCIO) DE CRIAÇÃO VINDOS DO REPOSITORY COM VALIDAÇÕES E USO DOS MÉTODOS 
*/
import { hash } from 'bcryptjs';

import type { IRegisterUseCaseParams } from '@/core/interfaces/RegisterUseCaseParams';
import type { IRegisterUseCaseResponse } from '@/core/interfaces/RegisterUseCaseResponse';
import type { PrismaUsersRepository } from '@/infra/db/repositories/prisma/PrismaUsersRepository';
import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error';

export class RegisterUseCase {
    // esse constructor sempre recebe o repository
    constructor(private prismaUsersRepository: PrismaUsersRepository) {}
    /**
     * Executa o processo de criar um novo usuário
     * @param name
     * @param email
     * @param password
     * @returns um objeto user
     * @throws UserAlreadyExistsError se ja houver um user com o mesmo email cadastrado
     */
    async execute({
        name,
        email,
        password,
    }: IRegisterUseCaseParams): Promise<IRegisterUseCaseResponse> {
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
