import { LinkedListNode } from './linked-list-node'
import { traversePrev } from './utils'

export class DoublyLinkedListNode<T> extends LinkedListNode<T> {
  static override of<T>(...values: T[]) {
    let node = new this<T>(values[0])

    for (let i = values.length; i > 1; i--) {
      node.next = new this<T>(values[i - 1], node.next, node)

      if (node.next.next !== null) {
        node.next.next.prev = node.next
      }
    }

    return node
  }

  constructor(
    value: T,
    public override next: DoublyLinkedListNode<T> | null = null,
    public prev: DoublyLinkedListNode<T> | null = null
  ) {
    super(value, next)
  }

  head(): DoublyLinkedListNode<T> | null {
    return this.prev === null ? this : this.prev.head()
  }

  override reverse(): DoublyLinkedListNode<T> {
    let curr: DoublyLinkedListNode<T> | null = this
    let prev = null
    let next = null

    while (curr !== null) {
      next = curr.next
      prev = curr.prev

      curr.prev = next
      curr.next = prev

      prev = curr
      curr = next
    }

    return (prev || curr)!
  }

  reduceRight(
    reducer: (accumulator: T, value: T, self: this) => T,
    initialValue?: T
  ): T
  reduceRight<A>(
    reducer: (accumulator: A, value: T, self: this) => A,
    initialValue: A
  ): A
  reduceRight<A>(
    reducer: (accumulator: T | A, value: T, self: this) => A,
    initialValue?: A
  ): T | A {
    let node: DoublyLinkedListNode<T> | null = this
    let accumulator

    if (initialValue === undefined) {
      accumulator = node.value
      node = node.prev
    } else {
      accumulator = initialValue
    }

    for (let { value } of traversePrev(node)) {
      accumulator = reducer(accumulator, value, this)
    }

    return accumulator
  }
}
