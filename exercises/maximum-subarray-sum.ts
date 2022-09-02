import { head } from '../utils/array/head'
import { tail } from '../utils/array/tail'

const { max } = Math

export function maximumSubarraySum(list: readonly number[]): number {
  let maximum = head(list) || 0
  let currentMaximum = maximum

  for (let n of tail(list)) {
    currentMaximum = max(n, currentMaximum + n)
    maximum = max(maximum, currentMaximum)
  }

  return maximum
}
