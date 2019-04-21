import { range, mY } from '../../utils'
import { SingleParamStore } from '../../utils/function/memoize'

// Longest increasing subsequence
// Subproblem: Suffix

// Recurrence
// n: number -> indication of NP-Hard, it is!
const lisr = (list: readonly number[]) => (lisr: (n: number) => number[]) => (
  n: number
): number[] => {
  let sequence = [list[n]]

  for (let i of range(n)) {
    if (list[n] > list[i]) {
      let subSequence = lisr(i).concat(list[n])

      if (subSequence.length > sequence.length) {
        sequence = subSequence
      }
    }
  }

  return sequence
}

export function lis(list: readonly number[]): number[] {
  let sequence: number[] = []
  let lisr_ = mY(lisr(list), new SingleParamStore())

  for (let i of range(list.length)) {
    let subSequence = lisr_(i)

    if (subSequence.length > sequence.length) {
      sequence = subSequence
    }
  }

  return sequence
}
