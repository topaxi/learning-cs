import { returnTrue } from './function/constant'
import { filter } from './iterator/filter'
import { range } from './range'

const { sqrt } = Math

const primeReducer = (
  primes: Set<number>,
  isPrime: boolean,
  prime: number
): Set<number> => (isPrime ? primes.add(prime) : primes)

export function primes(max: number): Set<number> {
  let primes = Array.from(range(max), returnTrue)
  primes[0] = primes[1] = false

  for (let i of filter(range(2, sqrt(max)), i => primes[i])) {
    for (let j of range(i * i, max, { step: i })) {
      primes[j] = false
    }
  }

  return primes.reduce(primeReducer, new Set())
}

export function isPrime(value: number): boolean {
  for (let i of range(2, value)) {
    if (value % i === 0) {
      return false
    }
  }

  return value > 1
}
