import { ESLint } from 'eslint';
import typescriptParser from '@typescript-eslint/parser';


/** @type {ESLint.ConfigData} */
export default {
    parser: typescriptParser,
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        project: './tsconfig.json',
    },
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
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
    },
    ignorePatterns: ['node_modules/', 'dist/', 'build/', 'vite.config.ts'],
};
