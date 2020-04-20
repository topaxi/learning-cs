import { sumWithoutPlus } from './sum-without-plus'

describe('sumWithoutPlus', () => {
  test('should sum two numbers', () => {
    expect(sumWithoutPlus(5, 7)).toBe(12)
    expect(sumWithoutPlus(-2, 2)).toBe(0)
    expect(sumWithoutPlus(0, 2)).toBe(2)
    expect(sumWithoutPlus(2, 0)).toBe(2)
    expect(sumWithoutPlus(0, -2)).toBe(-2)
  })
})
