import { findMedianSortedArrays } from './median-of-two-sorted-arrays'

describe('4. Median of Two Sorted Arrays', () => {
  it.each([
    { nums1: [1, 3], nums2: [2], median: 2 },
    { nums1: [1, 2], nums2: [3, 4], median: 2.5 },
  ])(
    '$nums1 + $nums2 should return median of $median',
    ({ nums1, nums2, median }) => {
      expect(findMedianSortedArrays(nums1, nums2)).toBe(median)
    }
  )
})
