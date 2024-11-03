module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        // Vos règles personnalisées
        'react/react-in-jsx-scope': 'off', // Pas nécessaire avec React 17+
        '@typescript-eslint/explicit-module-boundary-types': 'off'
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
};
