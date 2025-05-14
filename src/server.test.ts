import { server } from './server';
import request from 'supertest';

describe('Server', () => {
    // roda o server antes do teste
    beforeAll(async () => {
        await server.ready();
    });

    // fecha o server depois do teste
    afterAll(async () => {
        await server.close();
    });
    it('should test if server is running', async () => {
        const response = await request(server.server).get('/').expect(200);

        expect(response.body).toBeDefined();
    });
});
