import { smallest } from './smallest-positive-number-not-represented-as-sum-of-subset'

describe('smallest positive number not represented as sum of subset', () => {
  test('should return smallest positive number', () => {
    expect(smallest([1, 3, 6, 10, 11, 15])).toBe(2)
    expect(smallest([1, 1, 1, 1])).toBe(5)
    expect(smallest([1, 1, 3, 4])).toBe(10)
    expect(smallest([1, 2, 5, 10, 20, 40])).toBe(4)
    expect(smallest([1, 2, 3, 4, 5, 6])).toBe(22)
  })
})
