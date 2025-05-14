import type { listAllUsersCaseResponse } from '@/interfaces/ListAllUsersUseCaseResponse';

import { UsersRepository } from '@/repositories/UsersRepository';

export class ListAllUsersUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute(): Promise<listAllUsersCaseResponse> {
        const users = await this.usersRepository.listAll();

        return { users };
    }
}
