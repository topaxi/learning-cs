module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'jest'],
  env: {
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:jest/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    complexity: ['error', 10],
    'prefer-object-spread': 'error',
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/array-type': ['off', 'array-simple'],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      { allowExpressions: true }
    ]
  },
  overrides: [
    {
      files: [
        'exercises/movie.ts',
        'exercises/e/*',
        'utils/print-binary-tree.ts'
      ],
      rules: {
        'no-console': 'off'
      }
    },
    {
      files: ['**/*.test.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off'
      }
    }
  ]
}
