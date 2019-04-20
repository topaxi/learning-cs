import { pa, add, iter, arity2, join } from '../../utils'

const increment = pa(add, 1)

export class LinkedListNode<T> {
  static of<T>(...values: T[]) {
    let node = new this<T>(values[0])

    for (let i = values.length; i > 1; i--) {
      node.next = new this<T>(values[i - 1], node.next)
    }

    return node
  }

  static from<T>(values: Iterable<T>) {
    return this.of(...values)
  }

  constructor(public value: T, public next: LinkedListNode<T> | null = null) {}

  size(): number {
    return this.reduce(increment, 0)
  }

  push(...values: T[]): this {
    this.last().next = LinkedListNode.from(values)
    return this
  }

  *[Symbol.iterator](): IterableIterator<LinkedListNode<T>> {
    for (
      let node: LinkedListNode<T> | null = this;
      node !== null;
      node = node.next
    ) {
      yield node
    }
  }

  last(): LinkedListNode<T> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return iter.last(this)!
  }

  reverse(): LinkedListNode<T> {
    let current: LinkedListNode<T> | null = this
    let previous = null
    let next = null

    while (current !== null) {
      next = current.next

      current.next = previous

      previous = current
      current = next
    }

    return (previous || current)!
  }

  reduce(
    reducer: (accumulator: T, value: T, index: number, self: this) => T,
    initialValue?: T
  ): T
  reduce<A>(
    reducer: (accumulator: A, value: T, index: number, self: this) => A,
    initialValue: A
  ): A
  reduce<A>(
    reducer: (accumulator: T | A, value: T, index: number, self: this) => A,
    initialValue?: A
  ): T | A {
    let node: LinkedListNode<T> | null = this
    let index = 0
    let accumulator

    if (initialValue === undefined) {
      accumulator = node.value
      node = node.next
      index = 1
    } else {
      accumulator = initialValue
    }

    while (node !== null) {
      accumulator = reducer(accumulator, node.value, index++, this)
      node = node.next
    }

    return accumulator
  }

  join(delimiter = ','): string {
    if (this.next === null) return String(this.value)
    return this.next.reduce(arity2(pa(join, delimiter)), String(this.value))
  }

  toString(): string {
    return this.join()
  }
}
