import { shuffleInplace, range } from '../../utils'

export function defaultCompare(a: any, b: any): number {
  return b - a
}

function isSorted(
  list: ReadonlyArray<any>,
  compare: (a: any, b: any) => number
): boolean {
  for (let i of range(list.length - 1)) {
    if (compare(list[i], list[i + 1]) < 0) {
      return false
    }
  }

  return true
}

export function bsort<T>(
  list: ReadonlyArray<T>,
  compare: (a: T, b: T) => number = defaultCompare
) {
  let copy = Array.from(list)

  while (!isSorted(copy, compare)) shuffleInplace(copy)

  return copy
}
