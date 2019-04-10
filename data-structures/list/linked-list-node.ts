import { iter } from '../../utils'

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
}
