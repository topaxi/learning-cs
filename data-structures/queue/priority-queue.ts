import { length } from '../../utils/iterator/length'
import { tap } from '../../utils/iterator/tap'
import { HashMap, Hashable } from '../hash/hash-map'
import { MinHeap } from '../heap/min-heap'

export class PriorityQueue<T extends Hashable> implements Iterable<T> {
  private readonly heap = new MinHeap<T>(this.compare.bind(this))
  private readonly priorities = new HashMap<T, number>()

  get empty(): boolean {
    return this.length === 0
  }

  get length(): number {
    return length(this.heap)
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

  updatePriority(value: T, priority: number): this {
    if (this.heap.includes(value)) {
      this.priorities.set(value, priority)
      this.heap.push(this.heap.delete(value)!)
    }

    return this
  }

  consume(): IterableIterator<T> {
    return tap(this.heap.consume(), value => this.priorities.delete(value))
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
