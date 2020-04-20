import { primes } from '../utils/prime'
import { filter } from '../utils/iterator/filter'

export function twoPrimes(n: number): number[] {
  let ps = primes(n)

  for (let p of filter(ps, p => ps.has(n - p))) {
    return [p, n - p]
  }

  return []
}
