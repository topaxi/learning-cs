import { Heap } from '../../data-structures/heap'
import { neg } from '../../utils'

export function defaultCompare(a: any, b: any): number {
  return b - a
}

export function heapsort<T>(
  list: T[],
  compare: (a: T, b: T) => number = defaultCompare
): T[] {
  let heap = new Heap(neg(compare))

  heap.push(...list)

  return Array.from(heap.consume())
}
