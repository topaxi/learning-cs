import * as iter from './iterator'

describe('utils/iterator', () => {
  describe('flat()', () => {
    test('should flatten iterator', () => {
      let a = [1, 2, [3, 4, [5]]]

      expect(Array.from(iter.flat(a))).toEqual([1, 2, 3, 4, [5]])

      expect(Array.from(iter.flat(a, 0))).toEqual(a)
      expect(Array.from(iter.flat(a, 1))).toEqual([1, 2, 3, 4, [5]])
      expect(Array.from(iter.flat(a, 2))).toEqual([1, 2, 3, 4, 5])
    })
  })
})
