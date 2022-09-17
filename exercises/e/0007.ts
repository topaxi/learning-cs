import { consume } from '../../utils/iterator/consume'
import { take } from '../../utils/iterator/take'
import { primes } from '../../utils/prime'

export function solve(n: number) {
  return consume(take(primes(1000000), n))
}
