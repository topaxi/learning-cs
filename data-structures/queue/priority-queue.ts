import { HashMap, Hashable } from '../hash/hash-map'
import { MinHeap } from '../heap/min-heap'
import { iter } from '../../utils'

export class PriorityQueue<T extends Hashable> {
  private readonly heap = new MinHeap<T>(this.compare.bind(this))
  private readonly priorities = new HashMap<T, number>()

  get empty(): boolean {
    return this.length === 0
  }

  get length(): number {
    return this.heap.size
  }

  enqueue(value: T, priority = 0): this {
    this.priorities.set(value, priority)
    this.heap.push(value)

    return this
  }

  dequeue(): T | null {
    let value = this.heap.pop()

    if (value !== null) {
      this.priorities.delete(value)
    }

    return value
  }

  peek(): T | null {
    return this.heap.peek()
  }

  consume(): IterableIterator<T> {
    return iter.tap(this.heap.consume(), value =>
      this.priorities.delete(value)
    )
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.consume()
  }

  toJSON(): T[] {
    return this.heap.toJSON()
  }

  toString(): string {
    return this.heap.toString()
  }

  protected compare(a: T, b: T): number {
    return this.priorities.get(a)! - this.priorities.get(b)!
  }
}
