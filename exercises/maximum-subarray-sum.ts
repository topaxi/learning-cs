import { head, range } from '../utils'

export function maximumSubarraySum(list: readonly number[]): number {
  let maximum = head(list) || 0
  let currentMaximum = maximum

  for (let i of range(1, list.length)) {
    currentMaximum = Math.max(list[i], currentMaximum + list[i])
    maximum = Math.max(maximum, currentMaximum)
  }

  return maximum
}
