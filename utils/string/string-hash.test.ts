import { hashCode } from './string-hash'

describe('utils/string/string-hash', () => {
  test('should generate hash value from strings', () => {
    expect(hashCode('')).toBe(0)
    expect(hashCode('a')).toBe(97)
    expect(hashCode('a longer string')).toBe(-1445082519)
  })

  test('should generate same value for given input', () => {
    let values = [
      'a',
      'a longer string',
      'something quite a bit longer than those before'
    ]

    for (let value of values) {
      expect(hashCode(value)).toBe(hashCode(value))
    }
  })
})
