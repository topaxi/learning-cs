import { range } from '../range'
import { sum, sumBigInt } from './sum'

describe('utils/iterator/sum', () => {
  describe('sum()', () => {
    test('should return sum of an iterable', () => {
      expect(sum(range(1, 10))).toBe(45)
    })
  })

  describe('sumBigInt()', () => {
    test('should return sum of an iterable using BigInt', () => {
      expect(sumBigInt(range(1, 10, { project: n => BigInt(n) }))).toBe(45n)
    })
  })
})
