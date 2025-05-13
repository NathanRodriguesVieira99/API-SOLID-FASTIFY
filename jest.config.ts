import type { Config } from 'jest';

const config: Config = {
    roots: ['<rootDir>/src'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    transform: {
        '.+\\.ts$': 'ts-jest',
    },
    testEnvironment: 'node',
    coverageProvider: 'v8',
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
    },
};

export default config;
