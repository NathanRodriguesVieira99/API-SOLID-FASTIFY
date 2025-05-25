import { compare } from 'bcryptjs';

import { InvalidCredentialsError } from '@/shared/errors/invalid-credentials-error';

import type { IAuthenticateUseCaseParams } from '../interfaces/IAuthenticateUseCaseParams';
import type { IAuthenticateUseCaseResponse } from '../interfaces/IAuthenticateUseCaseResponse';
import type { IUsersRepository } from '../interfaces/IUsersRepository';

export class AuthenticateUseCase {
    // recebe o repositório  via injeção de dependência
    constructor(private usersRepository: IUsersRepository) {}

    /**
     * Executa o processo de autenticação.
     * @param email - E-mail do usuário
     * @param password - Senha em texto puro fornecida pelo usuário
     * @returns Objeto contendo o usuário autenticado
     * @throws InvalidCredentialsError se o usuário não existir ou a senha estiver incorreta
     */
    async execute({
        email,
        password,
    }: IAuthenticateUseCaseParams): Promise<IAuthenticateUseCaseResponse> {
        // busca o user no db pelo email
        const user = await this.usersRepository.findByEmail(email);

        // se o user não existir lança o erro
        if (!user) {
            throw new InvalidCredentialsError();
        }

        // compara a senha com o hash da senha armazenada
        const doesPasswordMatches = await compare(password, user.password_hash);

        // se as senhas não baterem retorna um erro
        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError();
        }

        // retorna o user em forma de objeto
        return {
            user,
        };
    }
}
