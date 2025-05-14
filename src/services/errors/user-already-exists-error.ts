// crio um novo erro com base na classe Erro default
export class UserAlreadyExistsError extends Error {
    constructor() {
        // adiciono esse novo erro no constructor da class pai Error
        super('Email already exists');
    }
}
