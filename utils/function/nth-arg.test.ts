import { nthArg, secondArg } from './nth-arg'

describe('utils/function/nth-arg', () => {
  describe('nthArg()', () => {
    test('should return function which returns nth arg', () => {
      expect(nthArg(0)(0, 1)).toBeUndefined()
      expect(nthArg(1)(3, 2)).toBe(3)
      expect(nthArg(2)(3, 2)).toBe(2)
      expect(nthArg(3)(3, 2, 1)).toBe(1)
      expect(nthArg(4)(3, 2, 1)).toBeUndefined()
    })
  })

  describe('secondArg()', () => {
    test('should return second argument', () => {
      expect(secondArg(0, 1)).toBe(1)
      expect(secondArg(3, 2)).toBe(2)
    })
  })
})
