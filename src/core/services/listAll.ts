import type { listAllUsersCaseResponse } from '@/core/interfaces/ListAllUsersUseCaseResponse';

import { UsersNoExistsError } from '../../shared/errors/users-no-exist-error';

import { UsersRepository } from '@/infrastructure/db/repositories/prisma/UsersRepository';

export class ListAllUsersUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute(): Promise<listAllUsersCaseResponse> {
        const users = await this.usersRepository.listAll();
        if (!users) {
            throw new UsersNoExistsError();
        }
        return { users };
    }
}
