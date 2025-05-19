import type { listAllUsersCaseResponse } from '@/core/interfaces/ListAllUsersUseCaseResponse';

import { UsersNoExistsError } from '../../shared/errors/users-no-exist-error';

import { PrismaUsersRepository } from '@/infrastructure/db/repositories/prisma/PrismaUsersRepository';

export class ListAllUsersUseCase {
    constructor(private prismaUsersRepository: PrismaUsersRepository) {}

    async execute(): Promise<listAllUsersCaseResponse> {
        const users = await this.prismaUsersRepository.listAll();
        if (!users) {
            throw new UsersNoExistsError();
        }
        return { users };
    }
}
