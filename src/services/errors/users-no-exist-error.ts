export class UsersNoExistsError extends Error {
    constructor() {
        super('User no exists');
    }
}
