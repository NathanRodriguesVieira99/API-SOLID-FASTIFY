import type { listAllUsersCaseResponse } from '@/interfaces/ListAllUsersUseCaseResponse';

import { UsersNoExistsError } from './errors/users-no-exist-error';

import { UsersRepository } from '@/repositories/prisma/UsersRepository';

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
