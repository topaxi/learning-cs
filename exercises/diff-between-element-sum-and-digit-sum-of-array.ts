import { flatMap } from '../utils/iterator/flat-map'
import { sum } from '../utils/iterator/sum'
import { toDigits } from '../utils/number/to-digits'

const { abs } = Math

export function differenceOfSum(nums: number[]): number {
  const digitSum = sum(flatMap(nums, toDigits))

  return abs(sum(nums) - digitSum)
}
