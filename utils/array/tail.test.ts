import { tail } from './tail'

describe('utils/array/tail', () => {
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
})
