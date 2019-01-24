import { range } from './range'

const returnTrue = () => true
const primeReducer = (primes: Set<number>, isPrime: boolean, prime: number) =>
  isPrime ? primes.add(prime) : primes

export function primes(max: number): Set<number> {
  let primes = Array.from(range(max), returnTrue)
  primes[0] = primes[1] = false

  for (let i of range(2, Math.sqrt(max))) {
    if (primes[i]) {
      for (let j = i * i; j < max; j += i) {
        primes[j] = false
      }
    }
  }

  return primes.reduce(primeReducer, new Set())
}

export function isPrime(value: number) {
  for (let i = 2; i < value; i++) {
    if (value % i === 0) {
      return false
    }
  }

  return value > 1
}
