import { SingleParamStore } from '../../utils/function/memoize/single-param-store'
import { mY } from '../../utils/function/y'
import { max } from '../../utils/iterator/max'
import { prop } from '../../utils/object/prop'
import { range } from '../../utils/range'

export const collatzSequenceLength = mY(
  (collatzSequenceLength: (n: number) => number) => n => {
    if (n === 1) return 1
    if (n % 2 === 0) return 1 + collatzSequenceLength(n / 2)

    return 1 + collatzSequenceLength(3 * n + 1)
  },
  new SingleParamStore()
)

export function solve(n: number): { n: number; length: number } {
  return max(
    range(1, n, { project: n => ({ n, length: collatzSequenceLength(n) }) }),
    prop('length')
  )
}
