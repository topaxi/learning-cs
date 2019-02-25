module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    'algorithms/**/*.ts',
    'data-structures/**/*.ts',
    'exercises/**/*.ts',
    'utils/**/*.ts'
  ]
}
