import { twoPrimes } from './two-primes'

describe('twoPrimes', () => {
  test('should return two prime numbers', () => {
    expect(twoPrimes(10)).toEqual([3, 7])
  })
})
