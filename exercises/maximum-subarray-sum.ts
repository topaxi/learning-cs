import { head } from '../utils/array/head'
import { max } from '../utils/iterator/minmax'
import { range } from '../utils/range'

export function maximumSubarraySum(list: readonly number[]): number {
  let maximum = head(list) || 0
  let currentMaximum = maximum

  for (let i of range(1, list.length)) {
    currentMaximum = max([list[i], currentMaximum + list[i]])
    maximum = max([maximum, currentMaximum])
  }

  return maximum
}
