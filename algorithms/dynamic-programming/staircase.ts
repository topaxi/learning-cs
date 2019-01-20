import { HashMap } from '../../data-structures/hash/hash-map'
import { Y, memoizedY } from '../../utils/y'

const staircase = (staircase: (n: number) => number) => (n: number) => {
  if (n < 2) return 1
  if (n === 2) return 2

  return staircase(n - 1) + staircase(n - 2)
}

export const staircase_naive = Y(staircase as any)
export const staircase_memo = memoizedY(
  staircase as any,
  new HashMap<number>()
)
