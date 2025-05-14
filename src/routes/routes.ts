/*
ROTAS SÃO CRIADAS CHAMANDO OS CONTROLLERS E COLOCANDO O NOME DO ENDPOINT
*/

import type { FastifyTypedInstance } from '@/_types/FastifyTypedInstance';
import { deleteUserById } from '@/controllers/delete';
import { register } from '@/controllers/register';

export const Routes = async (server: FastifyTypedInstance) => {
    server.post('/users', register);
    server.delete('/users/:id', deleteUserById);
};
