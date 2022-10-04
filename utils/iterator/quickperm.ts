import { range } from '../range'
import { swap } from '../swap'
import { length } from './length'

/**
 * Generate every permutation of the given iterable.
 *
 * @see https://www.quickperm.org/
 */
export function* quickperm<T>(iterable: Iterable<T>): Generator<T[]> {
  let a = [...iterable]
  let N = length(a)
  let p = [...range(N + 1)]
  let i = 1

  while (true) {
    yield [...a]

    if (i >= N) {
      break
    }

    p[i] -= 1

    let j = i % 2 === 0 ? 0 : p[i]

    swap(a, i, j)

    i = 1

    while (p[i] === 0) {
      p[i] = i
      i += 1
    }
  }
}
