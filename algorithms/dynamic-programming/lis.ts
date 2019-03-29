import { range, memoizedY } from '../../utils'
import { SingleParamStore } from '../../utils/memo'

// Longest increasing subsequence
// Subproblem: Suffix

// Recurrence
// n: number -> indication of NP-Hard, it is!
const lisr = (list: ReadonlyArray<number>) => (
  lisr: (n: number) => number[]
) => (n: number): number[] => {
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

export function lis(list: ReadonlyArray<number>): number[] {
  let sequence: number[] = []
  let lisr_ = memoizedY(lisr(list), new SingleParamStore())

  for (let i of range(list.length)) {
    let subSequence = lisr_(i)

    if (subSequence.length > sequence.length) {
      sequence = subSequence
    }
  }

  return sequence
}
