import { fibNaive, fibMemo, fibbu, fibbuo } from './fib'

describe('fib', () => {
  describe('naive', () => {
    test('should calculate fibonacci numbers', () => {
      expect(fibNaive(10)).toBe(55)
      expect(fibNaive(20)).toBe(6765)
    })
  })

  describe('memo', () => {
    test('should calculate fibonacci numbers', () => {
      expect(fibMemo(10)).toBe(55)
      expect(fibMemo(20)).toBe(6765)
    })

    test('should calculate bigger fibonacci numbers', () => {
      expect(fibMemo(50)).toBe(12586269025)
      expect(fibMemo(60)).toBe(1548008755920)
      expect(fibMemo(100)).toBe(354224848179262000000)
    })
  })

  describe('bottom up', () => {
    test('should calculate fibonacci numbers', () => {
      expect(fibbu(10)).toBe(55)
      expect(fibbu(20)).toBe(6765)
    })

    test('should calculate bigger fibonacci numbers', () => {
      expect(fibbu(50)).toBe(12586269025)
      expect(fibbu(60)).toBe(1548008755920)
      expect(fibbu(100)).toBe(354224848179262000000)
    })

    test('should calculate way bigger fibonacci numbers', () => {
      expect(fibbu(1000)).toBe(4.346655768693743e208)
    })
  })

  describe('bottom up space optimized', () => {
    test('should calculate fibonacci numbers', () => {
      expect(fibbuo(10)).toBe(55)
      expect(fibbuo(20)).toBe(6765)
    })

    test('should calculate bigger fibonacci numbers', () => {
      expect(fibbuo(50)).toBe(12586269025)
      expect(fibbuo(60)).toBe(1548008755920)
      expect(fibbuo(100)).toBe(354224848179262000000)
    })

    test('should calculate way bigger fibonacci numbers', () => {
      expect(fibbuo(1000)).toBe(4.346655768693743e208)
    })
  })
})
