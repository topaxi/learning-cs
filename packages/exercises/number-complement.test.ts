import { findComplement } from './number-complement'

describe('476. Number Complement', () => {
  test('should return complement', () => {
    expect(findComplement(5)).toBe(2)
    expect(findComplement(6)).toBe(1)
    expect(findComplement(2)).toBe(1)
    expect(findComplement(1)).toBe(0)
  })
})
