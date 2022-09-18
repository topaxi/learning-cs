import { max } from '../utils/iterator/minmax'

export function maxConsecutiveOnes(nums: number[]): number {
  let maxOnes = 0
  let curr = 0

  for (let num of nums) {
    if (num === 0) {
      curr = 0
    } else {
      curr++
      maxOnes = max([maxOnes, curr])
    }
  }

  return maxOnes
}
