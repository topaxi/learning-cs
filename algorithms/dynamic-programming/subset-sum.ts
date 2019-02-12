import { range } from '../../utils/range'
import { head, tail } from '../../utils/array'
import { memoizedY } from '../../utils/y'

// Given a set of non-negative integers, and a value sum,
// determine if there is a subset of the given set with sum equal to given sum.
export const subsetSum = memoizedY(
  subsetSum => (list: ReadonlyArray<number>, sum: number): boolean => {
    // Base case, a sum of 0 is always possible (empty list)
    if (sum === 0) return true

    // Base case, list is empty but sum is not zero
    if (list.length === 0) return false

    // Recurrence, ignore head if it is greater than the given sum
    if (head(list) > sum) return subsetSum(tail(list), sum)

    // Recurrence, is there a subset sum if we add the value or not?
    return (
      subsetSum(tail(list), sum) || subsetSum(tail(list), sum - head(list))
    )
  }
)
