import { lastIndex } from '../utils/array/last-index'
import { length } from '../utils/iterator/length'

// Solution is O(n+m)
// Excercise expects O(log(n+m)), there's probably a way to binary search
// within two arrays at the same time.
export function findMedianSortedArrays(
  nums1: number[],
  nums2: number[]
): number {
  const nums: number[] = []

  while (length(nums1) || length(nums2)) {
    if (length(nums2) === 0 || (length(nums1) !== 0 && nums1[0] <= nums2[0])) {
      nums.push(nums1.shift()!)
    } else if (length(nums2) !== 0) {
      nums.push(nums2.shift()!)
    }
  }

  const middle = lastIndex(nums) / 2

  if (lastIndex(nums) % 2 === 0) {
    return nums[middle]
  }

  return (nums[Math.floor(middle)] + nums[Math.ceil(middle)]) / 2
}
