module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    env: {
        browser: true,
        node: true,
    },
    globals: {
        __static: true,
    },
};
