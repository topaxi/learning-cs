import { range } from '../../utils/range'
import { Y, memoizedY } from '../../utils/y'
import { HashMap } from '../../data-structures/hash/hash-map'

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
  let lisr_ = memoizedY(lisr(list) as any, new HashMap())

  for (let i of range(list.length)) {
    let subSequence = lisr_(i)

    if (subSequence.length > sequence.length) {
      sequence = subSequence
    }
  }

  return sequence
}
