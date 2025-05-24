import { User } from '@/core/entities/User';

// tipagem dos métodos que o users-repository vai ter
export interface IUsersRepository {
    create(data: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    delete(id: string): Promise<boolean>;
    listAll(): Promise<User[]>;
}
