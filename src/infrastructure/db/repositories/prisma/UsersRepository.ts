/* 
REPOSITÓRIO QUE ARMAZENA OS MÉTODOS DE USER E CRIA CONTATO COM O BANCO DE DADOS VIA PRISMA ORM (SEMPRE ANTES CRIAR INTERFACES)
*/
import { prisma } from '@/infrastructure/db/lib/prisma';
import { Prisma, User } from '@prisma/client';

import { IUsersRepository } from '@/core/interfaces/users-repository';

export class UsersRepository implements IUsersRepository {
    // lógica de criar um usuário
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data,
        });

        return user;
    }
    // lógica de buscar um usuário pelo email
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }
    // lógica de deletar um usuário
    async delete(id: string): Promise<boolean> {
        const result = await prisma.user.delete({
            where: {
                id,
            },
        });

        return result ? true : false;
    }
    // lógica de listar os usuários
    async listAll(): Promise<User[]> {
        return prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password_hash: true,
                created_at: true,
                updated_at: true,
            },
        });
    }
}
