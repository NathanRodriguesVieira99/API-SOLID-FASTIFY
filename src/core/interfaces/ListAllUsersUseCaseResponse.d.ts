import type { User } from '@prisma/client';

export interface listAllUsersCaseResponse {
    users: Omit<User, 'password_hash'>[];
}
