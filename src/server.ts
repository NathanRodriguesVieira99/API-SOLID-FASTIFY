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

import { env } from '@/config/env/index';

import { Routes } from '@/infrastructure/http/routes/routes';

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
server.listen({ host: env.HOST, port: env.PORT }).then(() => {
    console.log(
        `🚀 HTTP server is running on http://localhost:${process.env.PORT} `
    );
});

// setup das rotas
server.register(Routes);

// setup do Cors
server.register(fastifyCors, { origin: '*' });
