import { User } from '@prisma/client';

// tipagem para o user que vai ser criado
export interface RegisterUseCaseResponse {
    user: User;
}
