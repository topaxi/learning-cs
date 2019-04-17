import { swap } from './swap'
import { lastIndex } from './array'

export function partition<T>(
  array: readonly T[],
  fn: (t: T, i: number, a: readonly T[]) => boolean
): [T[], T[]] {
  let a: T[] = []
  let b: T[] = []

  array.forEach((t, i, array) => {
    ;(fn(array[i], i, array) ? a : b).push(array[i])
  })

  return [a, b]
}

export function partitionInline<T>(
  array: T[],
  pivot: number,
  fn: (t: T, pivotElement: T) => boolean = (a, b) => a < b,
  left = 0,
  right = lastIndex(array)
): number {
  let pivotElement = array[pivot]

  swap(array, pivot, right)

  let newPivot = left

  for (let i = left; i <= right; i++) {
    if (fn(array[i], pivotElement)) {
      swap(array, i, newPivot++)
    }
  }

  swap(array, right, newPivot)

  return newPivot
}
