/*
ROTAS SÃO CRIADAS (E DOCUMENTAS NO SWAGGER) CHAMANDO OS CONTROLLERS E COLOCANDO O NOME DO ENDPOINT
*/
import type { FastifyTypedInstance } from '@/@types/FastifyTypedInstance';

import { UserRoutes } from './user-routes/user-routes';
import { HealthyRoute } from './healthy/healthy';

export const Routes = async (server: FastifyTypedInstance) => {
    server.register(HealthyRoute);
    server.register(UserRoutes);
};
