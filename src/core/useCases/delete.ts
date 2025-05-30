/* 
CASOS DE USO (REGRAS DE NEGÓCIO) DE DELEÇÃO VINDOS DO REPOSITORY 
*/
import type { PrismaUsersRepository } from '@/infra/db/repositories/prisma/PrismaUsersRepository';

export class DeleteUseCase {
    // esse constructor sempre recebe o repository
    constructor(private prismaUsersRepository: PrismaUsersRepository) {}

    /**
     * Executa o processo de deleção
     * @param id - ID do usuário
     * @returns Promise<boolean> - true se user foi deletado, false caso contrário
     */

    async execute(id: string): Promise<boolean> {
        const data = await this.prismaUsersRepository.delete(id);
        return data;
    }
}
