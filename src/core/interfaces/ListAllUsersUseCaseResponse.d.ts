import type { User } from '@prisma/client';

export interface listAllUsersCaseResponse {
    users: User[];
}
