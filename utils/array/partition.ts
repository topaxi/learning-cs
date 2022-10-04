import { filter } from '../iterator/filter'
import { length } from '../iterator/length'
import { range } from '../range'
import { swap } from '../swap'
import { lastIndex } from './last-index'

export function partition<T>(
  array: readonly T[],
  fn: (t: T, i: number, a: readonly T[]) => boolean
): [T[], T[]] {
  let a: T[] = []
  let b: T[] = []

  for (let i of range(length(array))) {
    ;(fn(array[i], i, array) ? a : b).push(array[i])
  }

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

  for (let i of filter(range(left, right), i => fn(array[i], pivotElement))) {
    swap(array, i, newPivot++)
  }

  swap(array, right, newPivot)

  return newPivot
}
