import { range } from '../range'
import { sum } from './sum'

describe('utils/iterator/sum', () => {
  describe('sum()', () => {
    test('should return sum of an iterable', () => {
      expect(sum(range(1, 10))).toBe(45)
    })
  })
})
