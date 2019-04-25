import { Y, mY } from '../../utils/function/y'
import { SingleParamStore } from '../../utils/function/memoize/single-param-store'

export const staircase = (staircase: (n: number) => number) => (n: number) => {
  if (n < 1) return 0
  if (n < 2) return 1
  if (n === 2) return 2

  return staircase(n - 1) + staircase(n - 2)
}

export const staircaseNaive = Y(staircase)
export const staircaseMemo = mY(staircase, new SingleParamStore())
