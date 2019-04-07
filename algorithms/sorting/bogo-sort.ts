import { shuffleInplace, range } from '../../utils'

export function defaultCompare(a: any, b: any): number {
  return a - b
}

function isSorted<T>(
  list: readonly T[],
  compare: (a: T, b: T) => number
): number {
  for (let i of range(list.length - 1)) {
    if (compare(list[i], list[i + 1]) >= 0) {
      return i
    }
  }

  return list.length - 1
}

export function bogosort<T>(
  list: readonly T[],
  compare: (a: T, b: T) => number = defaultCompare
): T[] {
  let copy = Array.from(list)
  let lastIndex = list.length - 1

  while (isSorted(copy, compare) !== lastIndex) {
    shuffleInplace(copy)
  }

  return copy
}

export function bogosortIncremental<T>(
  list: readonly T[],
  compare: (a: T, b: T) => number = defaultCompare
): T[] {
  let copy = Array.from(list)
  let lastIndex = list.length - 1
  let sortedIndex = 0

  while ((sortedIndex = isSorted(copy, compare)) !== lastIndex) {
    shuffleInplace(copy, sortedIndex)
  }

  return copy
}
