import type { User } from '../entities/User';

// valor esperado da resposta após a criação do usuário
export interface IAuthenticateUseCaseResponse {
    user: User;
}
