import { parseBinary } from './parse-binary'

describe('parseBinary', () => {
  test('should parse a binary string to a number', () => {
    expect(parseBinary('100')).toBe(4)
  })

  test('should throw on non binary strings', () => {
    expect(() => parseBinary('2')).toThrow()
  })
})
