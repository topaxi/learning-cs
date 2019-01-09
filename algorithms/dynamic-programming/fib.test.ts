import { expect } from 'chai'
import { fib_naive, fib_memo, fib_bu, fib_buo } from './fib'

describe('fib', () => {
  describe('naive', () => {
    it('should calculate fibonacci numbers', () => {
      expect(fib_naive(10)).to.equal(55)
    })
  })

  describe('memo', () => {
    it('should calculate fibonacci numbers', () => {
      expect(fib_memo(10)).to.equal(55)
    })

    it('should calculate bigger fibonacci numbers', () => {
      expect(fib_memo(50)).to.equal(12586269025)
    })
  })

  describe('bottom up', () => {
    it('should calculate fibonacci numbers', () => {
      expect(fib_bu(10)).to.equal(55)
    })

    it('should calculate bigger fibonacci numbers', () => {
      expect(fib_bu(50)).to.equal(12586269025)
    })

    it('should calculate way bigger fibonacci numbers', () => {
      expect(fib_bu(1000)).to.equal(4.346655768693743e208)
    })
  })

  describe('bottom up space optimized', () => {
    it('should calculate fibonacci numbers', () => {
      expect(fib_buo(10)).to.equal(55)
    })

    it('should calculate bigger fibonacci numbers', () => {
      expect(fib_buo(50)).to.equal(12586269025)
    })

    it('should calculate way bigger fibonacci numbers', () => {
      expect(fib_buo(1000)).to.equal(4.346655768693743e208)
    })
  })
})
