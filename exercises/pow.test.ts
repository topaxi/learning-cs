import { pow } from './pow'

describe('pow()', () => {
  test('should calculate the power of x to n', () => {
    expect(pow(2, 4)).toBe(Math.pow(2, 4))
    expect(pow(2, 3)).toBe(Math.pow(2, 3))
    expect(pow(2, 1)).toBe(Math.pow(2, 1))
    expect(pow(2, 0)).toBe(Math.pow(2, 0))
    expect(pow(2, -1)).toBe(Math.pow(2, -1))
  })
})
