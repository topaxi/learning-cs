import { parseBinary } from './parse-binary'

describe('parseBinary', () => {
  test.each`
    binaryString | value
    ${'0'}       | ${0}
    ${'1'}       | ${1}
    ${'10'}      | ${2}
    ${'100'}     | ${4}
    ${'101'}     | ${5}
    ${'1000000'} | ${64}
    ${'1111111'} | ${127}
  `('should parse $binaryString to $value', ({ binaryString, value }) => {
    expect(parseBinary(binaryString)).toBe(value)
  })

  test('should throw on non binary strings', () => {
    expect(() => parseBinary('')).toThrow(/Not a binary string/)
    expect(() => parseBinary('2')).toThrow(/Not a binary string/)
  })
})
