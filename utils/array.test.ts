import { tail, head, shuffleInplace, shuffle, sum, lastIndex } from './array'

describe('utils/array', () => {
  describe('tail()', () => {
    test('should return tail of array', () => {
      expect(tail([])).toEqual([])
      expect(tail([1])).toEqual([])
      expect(tail([1, 2])).toEqual([2])
      expect(tail([1, 2, 3])).toEqual([2, 3])
    })

    test('should return same tail for same array', () => {
      let arr = [1, 2, 3]
      let arrtail = tail(arr)

      expect(tail(arr)).toBe(arrtail)
    })
  })

  describe('head()', () => {
    test('should return head of array', () => {
      expect(head([])).toBeUndefined()
      expect(head([1])).toBe(1)
      expect(head([1, 2])).toBe(1)

      expect(head('')).toBeUndefined()
      expect(head('s')).toBe('s')
      expect(head('str')).toBe('s')

      expect(head({ 0: 'head' })).toBe('head')
    })
  })

  describe('sum()', () => {
    test('should return sum of array', () => {
      expect(sum([1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(45)
    })
  })

  describe('lastIndex()', () => {
    test('should return last index of array', () => {
      expect(lastIndex([])).toBe(-1)
      expect(lastIndex([1])).toBe(0)
      expect(lastIndex([1, 2, 3])).toBe(2)
    })

    test('should return last index of string', () => {
      expect(lastIndex('')).toBe(-1)
      expect(lastIndex('1')).toBe(0)
      expect(lastIndex('123')).toBe(2)
    })
  })

  describe('shuffle()', () => {
    test('should return a shuffled array', () => {
      let array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

      expect(shuffle(array)).not.toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
  })

  describe('shuffleInPlace()', () => {
    test('should return a shuffled array', () => {
      let array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

      expect(shuffleInplace(array)).not.toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
      expect(shuffleInplace(array)).toBe(array)
    })
  })
})
