/* 
REPOSITÓRIO EM MEMÓRIA QUE TEM OS MÉTODOS DE USER (USANDO A INTERFACE) SEM CONTATO COM ORM NEM BANCO DE DADOS 
*/

import { User } from '@/core/entities/User';
import type { IUsersRepository } from '@/core/interfaces/IUsersRepository';

export class InMemoryUsersRepository implements IUsersRepository {
    // array do tipo User para armazenar os valores em memória
    items: User[] = [];

    // lógica de criar um usuário
    async create(user: User): Promise<User> {
        // adiciona no array de User
        this.items.push(user);

        return user;
    }

    // lógica de buscar um usuário pelo email
    async findByEmail(email: string): Promise<User | null> {
        // busca um email igual ao email no array de User
        const user = this.items.find((item) => item.email === email);

        // se não achar retorna nulo
        if (!user) {
            return null;
        }

        return user;
    }

    // lógica de deletar um usuário
    async delete(id: string): Promise<boolean> {
        // procura o ID pelo índex do array User
        const index = await this.items.findIndex((item) => item.id === id);
        /*
         verifica se encontrou o ID no array User
         O índex será -1 se o array estiver vazio
       */
        if (index !== -1) {
            this.items.splice(index, 1); // remove um User do array
            return true;
        }
        return false; // não encontrou o ID
    }

    // lógica de listar os usuários
    async listAll(): Promise<User[]> {
        // Retorna os usuários omitindo o campo 'password_hash'
        return [...this.items];
    }
}
