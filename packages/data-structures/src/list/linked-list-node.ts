import { identity } from '@topaxi/lcs-utils/function/identity'
import { pa } from '@topaxi/lcs-utils/function/partial'
import { arity2 } from '@topaxi/lcs-utils/function/arity'
import { join } from '@topaxi/lcs-utils/string/join'
import { add } from '@topaxi/lcs-utils/operators'
import { map } from '@topaxi/lcs-utils/iterator/map'
import { last } from '@topaxi/lcs-utils/iterator/last'
import { traverseNext } from './utils'

const increment = pa(add, 1)

export class LinkedListNode<T> {
  static get [Symbol.species]() {
    return this
  }

  static of<T>(...values: T[]) {
    let node = new this[Symbol.species]<T>(values[0])

    for (let i = values.length; i > 1; i--) {
      node.next = new this[Symbol.species]<T>(values[i - 1], node.next)
    }

    return node
  }

  static from<T, R = T>(
    values: Iterable<T>,
    project: (value: T, index: number) => R = identity as any
  ) {
    return this.of(...map(values, project))
  }

  constructor(public value: T, public next: LinkedListNode<T> | null = null) {}

  size(): number {
    return this.reduce(increment, 0)
  }

  [Symbol.iterator](): IterableIterator<this> {
    return traverseNext(this)
  }

  last(): this {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return last(this)!
  }

  reverse(): LinkedListNode<T> {
    let curr: LinkedListNode<T> | null = this
    let prev = null
    let next = null

    while (curr !== null) {
      next = curr.next

      curr.next = prev

      prev = curr
      curr = next
    }

    return (prev || curr)!
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

    for (let { value } of traverseNext(node)) {
      accumulator = reducer(accumulator, value, index++, this)
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
