import { Heap } from './heap'

export class MinHeap<T = number> extends Heap<T> {
  constructor(comparator = (a: T, b: T): number => (a as any) - (b as any)) {
    super(comparator)
  }
}
