import { expect } from 'chai'
import { twoPrimes } from './two-primes'

describe('twoPrimes', () => {
  it('should return two prime numbers', () => {
    expect(twoPrimes(10)).to.deep.equal([3, 7])
  })
})
