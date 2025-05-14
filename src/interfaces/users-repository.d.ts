import { Prisma, User } from '@prisma/client';

// tipagem dos métodos que o users-repository vai ter
export interface IUsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    delete(id: string): Promise<boolean>;
}
