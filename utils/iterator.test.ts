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

  describe('some()', () => {
    test('should return true if predicate returns true', () => {
      let a = [1, 2, 3, 4]

      expect(iter.some(a, n => n === 4)).toBe(true)
      expect(iter.some(a, n => n === 5)).toBe(false)
    })

    test('should shortcut execution', () => {
      let a = [1, 2, 3, 4]
      let fn = jest.fn(n => n === 3)

      iter.some(a, fn)

      expect(fn).toHaveBeenCalledTimes(3)
    })
  })

  describe('every()', () => {
    test('should return true if predicate returns true', () => {
      let a = [1, 2, 3, 4]

      expect(iter.every(a, n => n < 5)).toBe(true)
      expect(iter.every(a, n => n === 4)).toBe(false)
    })

    test('should shortcut execution', () => {
      let a = [1, 2, 3, 4]
      let fn = jest.fn(n => n < 3)

      iter.every(a, fn)

      expect(fn).toHaveBeenCalledTimes(3)
    })
  })

  describe('includes()', () => {
    test('should return true if the given value is found in the iterable', () => {
      let a = [1, 2, 3, 4]

      expect(iter.includes(a, 4)).toBe(true)
      expect(iter.includes(a, 5)).toBe(false)
    })
  })

  describe('find()', () => {
    test('should return the found value', () => {
      let a = [1, 2, 3, 4, 5, 6]

      expect(iter.find(a, v => v === 4)).toBe(4)
    })
  })
})
