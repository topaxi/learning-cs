import { lastIndex } from './last-index'

describe('utils/array/last-index', () => {
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
})
