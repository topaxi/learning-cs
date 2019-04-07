import { partition, random } from '../../utils'

export function defaultCompare(a: any, b: any): number {
  return b - a
}

export function quicksort<T>(
  list: readonly T[],
  compare: (a: T, b: T) => number = defaultCompare
): readonly T[] {
  if (list.length < 2) return list
  if (list.length === 2) {
    return compare(list[0], list[1]) >= 0 ? list : [list[1], list[0]]
  }

  let pivot = random(0, list.length - 1)
  let pivotElement = list[pivot]

  let [greater, smaller] = partition(
    [...list.slice(0, pivot), ...list.slice(pivot + 1)],
    v => compare(pivotElement, v) >= 0
  )

  return [
    ...quicksort(smaller, compare),
    pivotElement,
    ...quicksort(greater, compare)
  ]
}
