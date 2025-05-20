/*
ROTAS SÃO CRIADAS (E DOCUMENTAS NO SWAGGER) CHAMANDO OS CONTROLLERS E COLOCANDO O NOME DO ENDPOINT
*/
import type { FastifyTypedInstance } from '@/@types/FastifyTypedInstance';

import { HealthyRoute } from './healthy/healthy';
import { UserRoutes } from './user-routes/user-routes';

export const Routes = async (server: FastifyTypedInstance) => {
    server.register(HealthyRoute);
    server.register(UserRoutes);
};
