import js from '@eslint/js';
import json from '@eslint/json';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        plugins: {
            js,
            import: importPlugin,
        },
        extends: ['js/recommended'],
        rules: {
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    pathGroups: [
                        {
                            pattern: '@/**',
                            group: 'internal',
                        },
                    ],
                    alphabetize: { order: 'asc', caseInsensitive: true },
                    'newlines-between': 'always',
                },
            ],
            'import/no-unresolved': 'error',
            'import/no-duplicates': 'error',
        },

        settings: {
            'import/resolver': {
                typescript: true,
            },
        },
    },
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        languageOptions: {
            globals: globals.node,
            parserOptions: {
                sourceType: 'module',
            },
        },
    },
    tseslint.configs.recommended,
    {
        files: ['**/*.json'],
        plugins: { json },
        language: 'json/json',
        extends: ['json/recommended'],
    },
]);
