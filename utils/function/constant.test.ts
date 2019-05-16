import { constant, returnTrue, returnFalse } from './constant'

describe('utils/function/constant', () => {
  describe('constant()', () => {
    test('should return function returning the given value', () => {
      expect(constant('foo')()).toBe('foo')
    })
  })

  describe('returnTrue()', () => {
    test('should return true', () => {
      expect(returnTrue()).toBe(true)
    })
  })

  describe('returnFalse()', () => {
    test('should return false', () => {
      expect(returnFalse()).toBe(false)
    })
  })
})
