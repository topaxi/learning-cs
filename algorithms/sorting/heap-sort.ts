import { Heap } from '../../data-structures/heap'

export function defaultCompare(a: any, b: any): number {
  return a - b
}

export function heapsort<T>(
  list: readonly T[],
  compare: (a: T, b: T) => number = defaultCompare
): T[] {
  let heap = new Heap(compare)

  heap.push(...list)

  return Array.from(heap.consume())
}
