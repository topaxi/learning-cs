import { primes } from '../utils/prime'

export function twoPrimes(n: number): number[] {
  let ps = primes(n)

  for (let p of ps) {
    if (ps.has(n - p)) {
      return [p, n - p]
    }
  }

  return []
}
