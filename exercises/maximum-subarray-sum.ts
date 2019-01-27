import { head } from '../utils/array'

export function maximumSubarraySum(list: ReadonlyArray<number>): number {
  let maximum = head(list)
  let currentMaximum = maximum

  for (let i = 1; i < list.length; i++) {
    currentMaximum = Math.max(list[i], currentMaximum + list[i])
    maximum = Math.max(maximum, currentMaximum)
  }

  return maximum
}
