import { Heap } from '../../data-structures/heap'
import { define } from './utils'

export const heapsort = define((list, compare) => {
  let heap = new Heap(compare)

  heap.push(...list)

  return Array.from(heap.consume())
})
