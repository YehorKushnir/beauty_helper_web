module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports'],
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    'unused-imports/no-unused-imports': 'error',

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',

    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],

    '@typescript-eslint/no-explicit-any': 'warn'
  }
}
