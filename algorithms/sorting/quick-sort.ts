import { partition } from '../../utils/partition'

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

  let pivot = random(0, list.length)
  let pivotElement = list[pivot]

  let [greater, smaller] = partition(
    [...list.slice(0, pivot), ...list.slice(pivot + 1)],
    v => compare(pivotElement, v) >= 0
  )

  return [...qsort(smaller, compare), pivotElement, ...qsort(greater, compare)]
}

function random(min: number, max: number): number {
  return Math.floor(Math.random() * max - min) + min
}
