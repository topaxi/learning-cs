// eslint-disable-next-line
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    'packages/algorithms/**/*.ts',
    'packages/data-structures/**/*.ts',
    'packages/exercises/**/*.ts',
    'packages/utils/**/*.ts',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/exercises/e/'],
  snapshotSerializers: ['./tests/binary-tree-serializer.ts'],
}
