import { Heap } from './heap'
import { neg } from '../../utils'

export class MaxHeap<T = number> extends Heap<T> {
  constructor(comparator = (a: T, b: T): number => (a as any) - (b as any)) {
    super(neg(comparator))
  }
}
