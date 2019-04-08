import { shuffleInplace, range, swap } from '../../utils'
import { define, Compare } from './utils'

function isSorted<T>(list: readonly T[], compare: Compare<T>): number {
  for (let i of range(list.length - 1)) {
    if (compare(list[i], list[i + 1]) >= 0) {
      return i
    }
  }

  return list.length - 1
}

export const bogosort = define((list, compare) => {
  let lastIndex = list.length - 1

  while (isSorted(list, compare) !== lastIndex) {
    shuffleInplace(list)
  }

  return list
})

export const bogosortIncremental = define((list, compare) => {
  let lastIndex = list.length - 1
  let sortedIndex = 0

  while ((sortedIndex = isSorted(list, compare)) !== lastIndex) {
    shuffleInplace(list, sortedIndex)
  }

  return list
})

function findSmallestIndex<T>(
  list: readonly T[],
  compare: Compare<T>
): number {
  return list.reduce(
    (smallestIndex, value, i, list) =>
      compare(list[smallestIndex], value) > 0 ? i : smallestIndex,
    0
  )
}

export const bogosortMinIncremental = define((list, compare) => {
  if (list.length < 2) return list

  let lastIndex = list.length - 1
  let sortedIndex = 0

  swap(list, 0, findSmallestIndex(list, compare))

  while ((sortedIndex = isSorted(list, compare)) !== lastIndex) {
    shuffleInplace(list, sortedIndex)
  }

  return list
})
