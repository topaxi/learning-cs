export function maxConsecutiveOnes(nums: number[]): number {
  let max = 0
  let curr = 0

  for (let num of nums) {
    if (num === 0) {
      curr = 0
    } else {
      curr++
      max = Math.max(max, curr)
    }
  }

  return max
}
