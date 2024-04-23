import { Head } from '../../utils/array/head'
import { prop } from '../../utils/object/prop'
import { arity3 } from '../../utils/function/arity'
import { paR } from '../../utils/function/partial'
import { secondArg } from '../../utils/function/nth-arg'
import { identity } from '../../utils/function/identity'
import { eq } from '../../utils/filters/eq'
import { concat } from '../../utils/operators'
import { map } from '../../utils/iterator/map'
import { isIterable } from '../../utils/iterator/is-iterable'
import { LinkedListNode } from './linked-list-node'
import { find } from '../../utils/iterator/find'
import { findIndex } from '../../utils/iterator/find-index'
import {
  assert,
  assertNotNull,
  assertNotNullish,
  assertNotUndefined,
} from '../../utils/assert'

export class LinkedList<T> implements Iterable<T>, Head<T | null> {
  static of<T>(...values: T[]) {
    return this.from(values)
  }

  static from<T, R = T>(
    values: Iterable<T>,
    project: (value: T, i: number) => R = identity as any
  ) {
    return new this<R>().push(...map(values, project))
  }

  private firstNode: LinkedListNode<T> | null = null
  private lastNode: LinkedListNode<T> | null = null

  get empty(): boolean {
    return this.firstNode === null
  }

  get 0(): T | null {
    return this.head()
  }

  unshift(...values: T[]): this {
    for (let value of values) {
      this.firstNode = new LinkedListNode(value, this.firstNode)
    }

    return this
  }

  push(...values: T[]): this {
    if (values.length === 0) return this

    let node = LinkedListNode.from(values)

    if (this.firstNode === null) {
      this.firstNode = node
    }

    if (this.lastNode !== null) {
      this.lastNode.next = node
    }

    this.lastNode = node.last()

    return this
  }

  shift(): T {
    assertNotNull(this.firstNode, 'Out of bounds!')

    let value = this.firstNode.value

    this.firstNode = this.firstNode.next

    if (this.firstNode === null) {
      this.lastNode = null
    }

    return value
  }

  pop(): T {
    assertNotNull(this.firstNode, 'Out of bounds!')

    let currentNode = this.firstNode

    if (currentNode.next === null) {
      this.firstNode = null
      this.lastNode = null

      return currentNode.value
    }

    let previousNode = null
    while (currentNode.next !== null) {
      previousNode = currentNode
      currentNode = currentNode.next
    }
    if (previousNode !== null) {
      previousNode.next = null
    }
    this.lastNode = previousNode

    return currentNode.value
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
    initialValue: A
  ): T | A {
    if (this.firstNode === null) {
      assertNotUndefined(
        initialValue,
        new TypeError('Reduce of empty List with no initial value!')
      )

      return initialValue
    }

    return this.firstNode.reduce(arity3(paR(reducer, this)), initialValue)
  }

  map<R>(project: (value: T, index: number, list: this) => R): LinkedList<R> {
    return this.reduce(
      (list, value, index, self) => list.push(project(value, index, self)),
      new LinkedList<R>()
    )
  }

  filter<S extends T>(
    filter: (value: T, index: number, list: this) => value is S
  ): LinkedList<S>
  filter(
    filter: (value: T, index: number, list: this) => unknown
  ): LinkedList<T>
  filter<S extends T>(
    filter: (value: T, index: number, list: this) => value is S
  ): LinkedList<S> {
    return this.reduce(
      (list, value, index, self) =>
        filter(value, index, self) ? list.push(value) : list,
      new LinkedList<S>()
    )
  }

  head(): T | null {
    return this.firstNode === null ? null : this.firstNode.value
  }

  tail(): LinkedList<T> {
    if (this.firstNode === null) {
      return new LinkedList<T>()
    }

    return Object.assign(new LinkedList<T>(), {
      firstNode: this.firstNode.next,
    })
  }

  size(): number {
    return this.firstNode === null ? 0 : this.firstNode.size()
  }

  concat(...lists: (Iterable<T> | T)[]): LinkedList<T>
  concat<S>(...lists: (Iterable<S> | S)[]): LinkedList<T | S>
  concat<S>(...lists: (Iterable<S | T> | S | T)[]): LinkedList<T | S> {
    return lists
      .map(this.concatNormalizer)
      .reduce(this.concatReducer, LinkedList.from(this))
  }

  flat<U>(this: LinkedList<LinkedList<U>>): LinkedList<U> {
    return this.reduce(concat, new LinkedList<U>())
  }

  flatMap<U, R>(
    this: LinkedList<LinkedList<U>>,
    project: (
      value: U,
      index: number,
      list: LinkedList<LinkedList<U>>
    ) => R | LinkedList<R>
  ): LinkedList<R> {
    let i = 0
    return this.reduce(
      (flat, list, _index, self) =>
        flat.concat(...list.map(value => project(value, i++, self))),
      new LinkedList<R>()
    )
  }

  private *nodes(): IterableIterator<LinkedListNode<T>> {
    if (this.firstNode !== null) yield* this.firstNode
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values()
  }

  private nodeToEntry(node: LinkedListNode<T>, i: number): [number, T] {
    return [i, node.value]
  }

  entries(): IterableIterator<[number, T]> {
    return map(this.nodes(), this.nodeToEntry)
  }

  keys(): IterableIterator<number> {
    return map(this.nodes(), secondArg)
  }

  values(): IterableIterator<T> {
    return map(this.nodes(), prop('value'))
  }

  find(predicate: (value: T, key: number, list: this) => boolean): T | null {
    return find(this, paR(predicate, this))
  }

  findIndex(
    predicate: (value: T, key: number, list: this) => boolean
  ): number {
    return findIndex(this, paR(predicate, this))
  }

  slice(start: number, end?: number): LinkedList<T> {
    let list = LinkedList.from(this)

    if (end !== undefined) {
      list.seekNode(end - 1).next = null
    }

    list.firstNode = list.seekNode(start)

    return list
  }

  splice(start: number, deleteCount: number, ...items: T[]): LinkedList<T> {
    let startNode =
      start > 0
        ? this.seekNode(start - 1)
        : new LinkedListNode(null as any, this.firstNode)
    let spliced = new LinkedList<T>()

    if (deleteCount > 0) {
      spliced.firstNode = startNode.next
      let to = spliced.seekNode(deleteCount - 1)
      startNode.next = to.next
      to.next = null
    }

    if (start === 0) {
      this.firstNode = startNode.next
    }

    for (let i = items.length; i > 0; i--) {
      startNode.next = new LinkedListNode(items[i - 1], startNode.next)
    }

    return spliced
  }

  delete(value: T): T | null {
    return this.deleteAt(this.indexOf(value))
  }

  deleteAt(index: number): T | null {
    if (index === -1) return null
    return this.splice(index, 1).head()
  }

  includes(value: T): boolean {
    return this.indexOf(value) !== -1 // eslint-disable-line
  }

  indexOf(value: T): number {
    return this.findIndex(eq(value))
  }

  join(delimiter = ','): string {
    return this.firstNode === null ? '' : this.firstNode.join(delimiter)
  }

  get(index: number): T {
    return this.seekNode(index).value
  }

  reverse(): this {
    if (this.firstNode !== null) {
      let firstNode = this.firstNode

      this.firstNode = firstNode.reverse()
      this.lastNode = firstNode
    }

    return this
  }

  toArray(): T[] {
    return Array.from(this)
  }

  toJSON(): T[] {
    return this.toArray()
  }

  toString(): string {
    return this.join()
  }

  private seekNode(index: number): LinkedListNode<T> {
    assert(
      index >= 0 && this.firstNode !== null,
      `Index ${index} is out of bounds!`
    )

    let node = this.firstNode
    while (index--) {
      assertNotNullish(node?.next, 'Out of bounds!')

      node = node.next
    }

    return node
  }

  private concatNormalizer<S>(
    list: Iterable<S | T> | S | T
  ): LinkedList<S | T> {
    return typeof list !== 'string' && isIterable(list)
      ? LinkedList.from(list)
      : LinkedList.of(list)
  }

  private concatReducer<T>(
    acc: LinkedList<T>,
    list: LinkedList<T>
  ): LinkedList<T> {
    if (list.lastNode === null) return acc

    if (acc.lastNode === null) {
      acc.firstNode = list.firstNode
    } else {
      acc.lastNode.next = list.firstNode
    }

    acc.lastNode = list.lastNode

    return acc
  }
}
