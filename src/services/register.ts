/* 
CASOS DE USO (REGRAS DE NEGÓCIO) DE CRIAÇÃO VINDOS DO REPOSITORY COM VALIDAÇÕES E USO DOS MÉTODOS 
*/
import type { RegisterUseCaseParams } from '@/interfaces/RegisterUseCaseParams';
import type { RegisterUseCaseResponse } from '@/interfaces/RegisterUseCaseResponse';
import type { UsersRepository } from '@/repositories/UsersRepository';

import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error';

import { hash } from 'bcryptjs';

export class RegisterUseCase {
    // esse constructor sempre recebe o repository
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        name,
        email,
        password,
    }: RegisterUseCaseParams): Promise<RegisterUseCaseResponse> {
        // faz o hash da senha
        const password_hash = await hash(password, 6);

        // valida se tenta criar usuário com email já cadastrado
        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        // chama o método de criação do usuário e o cria
        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
        });

        return {
            user,
        };
    }
}
