import { Y, memoizedY } from '../../utils/y'
import { SingleParamStore } from '../../utils/memo'

const staircase = (staircase: (n: number) => number) => (n: number) => {
  if (n < 1) return 0
  if (n < 2) return 1
  if (n === 2) return 2

  return staircase(n - 1) + staircase(n - 2)
}

export const staircase_naive = Y(staircase)
export const staircase_memo = memoizedY(staircase, new SingleParamStore())
