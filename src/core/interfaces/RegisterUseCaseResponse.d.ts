import { User } from '@prisma/client';

// tipagem para o user que vai ser criado
export interface IRegisterUseCaseResponse {
    user: User;
}
