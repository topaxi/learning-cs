import { shuffleInplace, range, swap, neg } from '../../utils'
import { define, Compare } from './utils'

function isSortedTo<T>(list: T[], start: number, compare: Compare<T>): number {
  for (let i of range(start, list.length - 1)) {
    if (compare(list[i], list[i + 1]) > 0) {
      return i
    }
  }

  return list.length - 1
}

export const bogosort = define((list, compare) => {
  let lastIndex = list.length - 1

  while (isSortedTo(list, 0, compare) !== lastIndex) {
    shuffleInplace(list)
  }

  return list
})

export const bogosortIncremental = define((list, compare) => {
  let lastIndex = list.length - 1
  let sortedIndex = 0

  while (
    (sortedIndex = isSortedTo(list, Math.max(0, sortedIndex - 1), compare)) !==
    lastIndex
  ) {
    shuffleInplace(list, sortedIndex)
  }

  return list
})

function findSmallestIndex<T>(list: T[], compare: Compare<T>): number {
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

  while (
    (sortedIndex = isSortedTo(list, Math.max(0, sortedIndex - 1), compare)) !==
    lastIndex
  ) {
    shuffleInplace(list, sortedIndex)
  }

  return list
})

function isSortedFrom<T>(list: T[], end: number, compare: Compare<T>): number {
  for (let i = end; i > 0; i--) {
    if (compare(list[i - 1], list[i]) > 0) {
      return i
    }
  }

  return 0
}

function findLargestIndex<T>(list: T[], compare: Compare<T>): number {
  return findSmallestIndex(list, neg(compare))
}

export const bogosortMinMaxIncremental = define((list, compare) => {
  if (list.length < 2) return list

  let lastIndex = list.length - 1
  let sortedStartIndex = 0
  let sortedEndIndex = lastIndex

  swap(list, 0, findSmallestIndex(list, compare))
  swap(list, lastIndex, findLargestIndex(list, compare))

  while (
    (sortedStartIndex = isSortedTo(
      list,
      Math.max(0, sortedStartIndex - 1),
      compare
    )) <
    (sortedEndIndex = isSortedFrom(
      list,
      Math.min(sortedEndIndex + 1, lastIndex),
      compare
    ))
  ) {
    shuffleInplace(list, sortedStartIndex, sortedEndIndex)
  }

  return list
})
