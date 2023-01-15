import { HashSet } from '../data-structures/hash/hash-set'
import { map } from '../utils/iterator/map'
import { sum } from '../utils/iterator/sum'
import { toDigits } from '../utils/number/to-digits'

function square(n: number) {
  return n ** 2
}

export function isHappy(n: number): boolean {
  const s = new HashSet()

  do {
    s.add(n)

    n = sum(map(toDigits(n), square))

    if (n === 1) return true
  } while (!s.has(n))

  return false
}
