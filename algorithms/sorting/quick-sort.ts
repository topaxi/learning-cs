import { partition } from '../../utils/partition'
import { random } from '../../utils/random'

export function defaultCompare(a: any, b: any): number {
  return b - a
}

export function qsort<T>(
  list: ReadonlyArray<T>,
  compare: (a: T, b: T) => number = defaultCompare
): ReadonlyArray<T> {
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

  return [...qsort(smaller, compare), pivotElement, ...qsort(greater, compare)]
}