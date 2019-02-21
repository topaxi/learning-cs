import { fib_naive, fib_memo, fib_bu, fib_buo } from './fib'

describe('fib', () => {
  describe('naive', () => {
    test('should calculate fibonacci numbers', () => {
      expect(fib_naive(10)).toBe(55)
    })
  })

  describe('memo', () => {
    test('should calculate fibonacci numbers', () => {
      expect(fib_memo(10)).toBe(55)
    })

    test('should calculate bigger fibonacci numbers', () => {
      expect(fib_memo(50)).toBe(12586269025)
    })
  })

  describe('bottom up', () => {
    test('should calculate fibonacci numbers', () => {
      expect(fib_bu(10)).toBe(55)
    })

    test('should calculate bigger fibonacci numbers', () => {
      expect(fib_bu(50)).toBe(12586269025)
    })

    test('should calculate way bigger fibonacci numbers', () => {
      expect(fib_bu(1000)).toBe(4.346655768693743e208)
    })
  })

  describe('bottom up space optimized', () => {
    test('should calculate fibonacci numbers', () => {
      expect(fib_buo(10)).toBe(55)
    })

    test('should calculate bigger fibonacci numbers', () => {
      expect(fib_buo(50)).toBe(12586269025)
    })

    test('should calculate way bigger fibonacci numbers', () => {
      expect(fib_buo(1000)).toBe(4.346655768693743e208)
    })
  })
})
