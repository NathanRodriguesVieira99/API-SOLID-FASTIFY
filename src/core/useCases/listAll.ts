import type { IlistAllUsersCaseResponse } from '@/core/interfaces/ListAllUsersUseCaseResponse';
import { PrismaUsersRepository } from '@/infrastructure/db/repositories/prisma/PrismaUsersRepository';

import { UsersNoExistsError } from '../../shared/errors/users-no-exist-error';

export class ListAllUsersUseCase {
    constructor(private prismaUsersRepository: PrismaUsersRepository) {}

    async execute(): Promise<IlistAllUsersCaseResponse> {
        const users = await this.prismaUsersRepository.listAll();
        if (!users) {
            throw new UsersNoExistsError();
        }
        return { users };
    }
}
