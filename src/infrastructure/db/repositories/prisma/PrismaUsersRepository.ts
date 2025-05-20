/* 
REPOSITÓRIO QUE TEM OS MÉTODOS DE USER (USANDO A INTERFACE) E CRIA CONTATO COM O BANCO DE DADOS VIA PRISMA ORM 
*/
import { prisma } from '@/infrastructure/db/lib/prisma';
import { User, Prisma } from '@prisma/client';

import { IPrismaUsersRepository } from '@/core/interfaces/users-repository';

export class PrismaUsersRepository implements IPrismaUsersRepository {
    // lógica de criar um usuário
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data: {
                ...data,
                created_at: new Date(),
                updated_at: new Date(),
            },
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
    async listAll(): Promise<Omit<User, 'password_hash'>[]> {
        return prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
                updated_at: true,
            },
        });
    }
}
