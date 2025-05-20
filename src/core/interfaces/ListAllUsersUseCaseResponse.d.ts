import type { User } from '@prisma/client';

export interface IlistAllUsersCaseResponse {
    users: Omit<User, 'password_hash'>[];
}
