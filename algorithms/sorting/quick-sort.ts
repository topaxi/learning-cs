import { partition, random } from '../../utils'

export function defaultCompare(a: any, b: any): number {
  return a - b
}

export function quicksort<T>(
  list: readonly T[],
  compare: (a: T, b: T) => number = defaultCompare
): readonly T[] {
  if (list.length < 2) return list

  let pivot = random(0, list.length - 1)
  let pivotElement = list[pivot]

  let [greater, smaller] = partition(
    [...list.slice(0, pivot), ...list.slice(pivot + 1)],
    v => compare(pivotElement, v) < 0
  )

  return [
    ...quicksort(smaller, compare),
    pivotElement,
    ...quicksort(greater, compare)
  ]
}
