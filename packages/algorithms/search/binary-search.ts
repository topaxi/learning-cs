import { lastIndex } from '@topaxi/lcs-utils/array/last-index'

export function binarySearch<T = number>(
  list: T[],
  element: T,
  compare: (a: T, b: T) => number = ((a: number, b: number) => a - b) as any
): number {
  let start = 0
  let end = lastIndex(list)

  while (start <= end) {
    let i = Math.floor((start + end) / 2)
    let r = compare(list[i], element)

    if (r === 0) {
      return i
    }

    if (r < 0) {
      start = i + 1
    } else {
      end = i - 1
    }
  }

  return -1
}
