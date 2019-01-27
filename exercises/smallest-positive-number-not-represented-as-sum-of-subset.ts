// How to find the smallest positive integer value that cannot be represented
// as sum of any subset of a given array?
// You have given a sorted array (sorted in non-decreasing order) of positive
// numbers, find the smallest positive integer value that cannot be represented
// as sum of elements of any subset of given set. What makes it more
// challenging is expected time complexity of O(n).
export function smallest(array: number[]): number {
  let sum = 1

  // As the array is sorted, we sum each value until we find a gap.
  // We found a gap once our sum is smaller than the current value or hit the
  // end of the array.
  for (let i = 0; i < array.length && sum >= array[i]; i++) {
    sum = sum + array[i]
  }

  return sum
}
