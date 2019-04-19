import { head, tail, mY } from '../../utils'

// Given a set of non-negative integers, and a value sum,
// determine if there is a subset of the given set with sum equal to given sum.
export const subsetSum = mY(
  subsetSum => (list: readonly number[], sum: number): boolean => {
    // Base case, a sum of 0 is always possible (empty list)
    if (sum === 0) return true

    // Base case, list is empty but sum is not zero
    if (list.length === 0) return false

    // Recurrence, ignore head if it is greater than the given sum
    if (head(list)! > sum) return subsetSum(tail(list), sum)

    // Recurrence, is there a subset sum if we add the value or not?
    return (
      subsetSum(tail(list), sum) || subsetSum(tail(list), sum - head(list)!)
    )
  }
)
