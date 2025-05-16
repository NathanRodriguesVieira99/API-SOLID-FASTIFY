/* 
CASOS DE USO (REGRAS DE NEGÓCIO) DE DELEÇÃO VINDOS DO REPOSITORY 
*/
import type { UsersRepository } from '@/repositories/prisma/UsersRepository';

export class DeleteUseCase {
    // esse constructor sempre recebe o repository
    constructor(private usersRepository: UsersRepository) {}

    async execute(id: string): Promise<boolean> {
        const data = await this.usersRepository.delete(id);
        return data;
    }
}
