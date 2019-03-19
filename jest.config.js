// eslint-disable-next-line
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    'algorithms/**/*.ts',
    'data-structures/**/*.ts',
    'exercises/**/*.ts',
    'utils/**/*.ts'
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/exercises/e/'],
  snapshotSerializers: ['./tests/binary-tree-serializer.ts']
}
