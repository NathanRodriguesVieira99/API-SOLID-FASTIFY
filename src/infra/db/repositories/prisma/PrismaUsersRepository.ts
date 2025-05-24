/* 
REPOSITÓRIO QUE TEM OS MÉTODOS DE USER (USANDO A INTERFACE) E CRIA CONTATO COM O BANCO DE DADOS VIA PRISMA ORM 
*/
import { Prisma } from '@prisma/client';

import { User } from '@/core/entities/User';
import { IUsersRepository } from '@/core/interfaces/IUsersRepository';
import { prisma } from '@/infra/db/lib/prisma';

export class PrismaUsersRepository implements IUsersRepository {
    // lógica de criar um usuário
    async create(user: Prisma.UserCreateInput): Promise<User> {
        const prismaUser = await prisma.user.create({
            data: {
                ...user,
                created_at: new Date(),
                updated_at: new Date(),
            },
        });

        return User.reconstitute(prismaUser);
    }
    // lógica de buscar um usuário pelo email
    async findByEmail(email: string): Promise<User | null> {
        const prismaUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!prismaUser) {
            return null;
        }

        return User.reconstitute(prismaUser);
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
        const prismaUsers = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password_hash: true,
                created_at: true,
                updated_at: true,
            },
        });

        return prismaUsers.map((prismaUser) => User.reconstitute(prismaUser));
    }
}
