import { tinyCalculator } from './tiny-calculator'

describe('tinyCalculator', () => {
  test('should add numbers', () => {
    expect(tinyCalculator('1 + 1')).toBe(2)
    expect(tinyCalculator('1 + 9')).toBe(10)
    expect(tinyCalculator('12 + 9')).toBe(21)
  })

  test('should handle negative numbers', () => {
    expect(tinyCalculator('1 + -9')).toBe(-8)
  })

  test('should subtract numbers', () => {
    expect(tinyCalculator('1 - 1')).toBe(0)
    expect(tinyCalculator('5 - 3')).toBe(2)
    expect(tinyCalculator('5 - 2 - 1')).toBe(2)
    expect(tinyCalculator('12 - 5')).toBe(7)
    expect(tinyCalculator('1 - 9')).toBe(-8)
  })

  test('should handle parens', () => {
    expect(tinyCalculator('5 - (2 + 1)')).toBe(2)
    expect(tinyCalculator('5 - (2 - 1)')).toBe(4)
  })
})
