import { filter } from '../../utils/iterator/filter'
import { last } from '../../utils/iterator/last'
import { primes } from '../../utils/prime'

export function solve(max: number): number | undefined {
  let n = 600_851_475_143
  let factors: number[] = []

  for (let prime of filter(primes(max), prime => n % prime === 0)) {
    n /= prime
    factors.push(prime)
  }

  return last(factors)
}
