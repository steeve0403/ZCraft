import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';

export default [
    js.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
                project: './tsconfig.json',
            },
        },
        // env: {
        //     browser: true,
        //     es2021: true,
        //     node: true,
        // },
        plugins: {
            react: react,
            'react-hooks': reactHooks,
            '@typescript-eslint': typescriptEslint,
            prettier: prettier,
            import: importPlugin,
        },
        rules: {
            'prettier/prettier': ['error', { endOfLine: 'auto' }],
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'react/prop-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {},
            },
        },
        ignores: ['node_modules/', 'dist/', 'build/', 'vite.config.ts'],
    },
];
