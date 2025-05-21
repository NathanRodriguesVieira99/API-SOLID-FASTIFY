import { compare } from 'bcryptjs';

import { InMemoryUsersRepository } from '@/infra/db/repositories/in-memory/InMemoryUsersRepository';

import { RegisterUseCase } from '../register';

describe('POST /users ', () => {
    const userMock = {
        name: 'Jhon Doe',
        email: 'JhonDoe@example.com',
        password: '12345678',
    };

    it('should hash user password upon registration ', async () => {
        // chamo o repositório em memória e injeto no UseCase
        const usersRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        // executo o método de criar User com um user mockado
        const { user } = await registerUseCase.execute(userMock);

        // comparo se a senha do user corresponde a senha com hash criada pelo bcryptjs
        const isPasswordCorrectlyHashed = await compare(
            userMock.password,
            user.password_hash
        );

        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it('should not be able to register with the same email twice', () => {});
});
