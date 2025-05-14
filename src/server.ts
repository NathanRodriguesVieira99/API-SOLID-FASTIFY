import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import {
    validatorCompiler,
    serializerCompiler,
    type ZodTypeProvider,
    jsonSchemaTransform,
} from 'fastify-type-provider-zod';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';

import { env } from '@/env/index';

import { Routes } from './routes/routes';

// criação do servidor HTTP
export const server = fastify({}).withTypeProvider<ZodTypeProvider>();

// setup Zod e Swagger
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'API',
            version: '1.0.0',
        },
    },
    transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
    routePrefix: '/docs',
});

// inicialização do servidor HTTP
server.listen({ host: '0.0.0.0', port: env.PORT }).then(() => {
    console.log('🚀 HTTP server is running ');
});

// setup das rotas
server.register(Routes);

// setup do Cors
server.register(fastifyCors, { origin: '*' });
