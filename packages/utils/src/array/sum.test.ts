import { sum } from './sum'

describe('utils/array/sum', () => {
  describe('sum()', () => {
    test('should return sum of array', () => {
      expect(sum([1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(45)
    })
  })
})
