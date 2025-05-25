import type { IlistAllUsersCaseResponse } from '@/core/interfaces/ListAllUsersUseCaseResponse';
import { PrismaUsersRepository } from '@/infra/db/repositories/prisma/PrismaUsersRepository';

import { UsersNoExistsError } from '../../shared/errors/users-no-exist-error';

export class ListAllUsersUseCase {
    constructor(private prismaUsersRepository: PrismaUsersRepository) {}

    /**
     * Executa o processo de listagem de todos os user
     * @returns um objeto com a lista de todos os users
     * @throws UsersNoExistsErros se nenhum user for encontrado
     */
    async execute(): Promise<IlistAllUsersCaseResponse> {
        const users = await this.prismaUsersRepository.listAll();
        if (!users) {
            throw new UsersNoExistsError();
        }
        return { users };
    }
}
