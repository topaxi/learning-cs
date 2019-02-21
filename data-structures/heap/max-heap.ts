import { Heap } from './heap'

export class MaxHeap<T = number> extends Heap<T> {
  constructor(comparator = (a: T, b: T) => (b as any) - (a as any)) {
    super(comparator)
  }
}
