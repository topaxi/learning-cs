import { eq } from '../../utils/eq'
import 'core-js/fn/array/flat-map'

class LinkedListNode<T> {
  constructor(public value: T, public next: LinkedListNode<T> | null = null) {}

  toJSON() {
    return this.value
  }

  toString() {
    return String(this.value)
  }
}

export class LinkedList<T> implements Iterable<T> {
  static of<T>(...values: T[]) {
    return this.from(values)
  }

  static from<T>(values: Iterable<T>) {
    let list = new this<T>()
    for (let value of values) {
      list.push(value)
    }
    return list
  }

  private firstNode: LinkedListNode<T> | null = null
  private lastNode: LinkedListNode<T> | null = null

  get empty() {
    return this.firstNode === null
  }

  unshift(value: T): this {
    this.firstNode = new LinkedListNode(value, this.firstNode)
    return this
  }

  push(value: T): this {
    let node = new LinkedListNode(value)

    if (this.firstNode === null) {
      this.firstNode = node
      return this
    }

    let prev = this.firstNode
    while (prev.next !== null) prev = prev.next
    this.lastNode = prev.next = node
    return this
  }

  shift(): T {
    if (this.firstNode === null) {
      throw new Error('Out of bounds!')
    }

    let value = this.firstNode.value

    if (this.firstNode.next !== null) {
      this.firstNode = this.firstNode.next
      if (this.firstNode === null) {
        this.lastNode = null
      }
    } else {
      this.firstNode = null
    }

    return value
  }

  pop(): T {
    if (this.firstNode === null) {
      throw new Error('Out of bounds!')
    }

    let currentNode = this.firstNode
    let previousNode = null
    while (currentNode.next !== null) {
      previousNode = currentNode
      currentNode = currentNode.next!
    }
    if (previousNode !== null) {
      previousNode.next = null
    }
    this.lastNode = previousNode

    return currentNode.value
  }

  reduce<A>(
    reducer: (accumulator: T | A, value: T, index: number, self: this) => A
  ): A
  reduce<A>(
    reducer: (accumulator: A, value: T, index: number, self: this) => A,
    initialValue: A
  ): A
  reduce<A>(
    reducer: (accumulator: any, value: T, index: number, self: this) => A,
    initialValue?: A
  ): any {
    if (this.firstNode === null) {
      if (initialValue !== undefined) {
        return initialValue
      }

      throw new Error('Reduce of empty List with no initial value!')
    }

    let node: LinkedListNode<T> | null = this.firstNode
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

  map<R>(project: (value: T, index: number, list: this) => R): LinkedList<R> {
    return this.reduce(
      (list, value, index, self) => list.push(project(value, index, self)),
      new LinkedList()
    )
  }

  filter<S extends T>(
    filter: (value: T, index: number, list: this) => value is S
  ): LinkedList<S>
  filter(filter: (value: T, index: number, list: this) => any): LinkedList<T>
  filter(filter: (value: T, index: number, list: this) => any): LinkedList<T> {
    return this.reduce(
      (list, value, index, self) =>
        filter(value, index, self) ? list.push(value) : list,
      new LinkedList()
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
      firstNode: this.firstNode.next
    })
  }

  size(): number {
    return this.reduce(size => ++size, 0)
  }

  concat(...lists: (Iterable<T> | T)[]): LinkedList<T>
  concat<S>(...lists: (Iterable<S> | S)[]): LinkedList<T | S>
  concat(...lists: (Iterable<any> | any)[]): LinkedList<any> {
    return lists
      .map(list =>
        this.isIterable(list) ? LinkedList.from(list) : LinkedList.of(list)
      )
      .filter(list => list.lastNode !== null)
      .reduce((acc, list) => {
        acc.lastNode!.next = list.firstNode
        return acc
      }, LinkedList.from(this))
  }

  flat<U>(this: LinkedList<LinkedList<U>>): LinkedList<U> {
    return this.reduce((flat, list) => flat.concat(list), new LinkedList<U>())
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
        flat.concat(...list.map(value => project(value, i++, this))),
      new LinkedList<R>()
    )
  }

  *[Symbol.iterator](): IterableIterator<T> {
    let node = this.firstNode
    if (node !== null) {
      yield node.value
      while ((node = node.next) !== null) {
        yield node.value
      }
    }
  }

  find(callback: (value: T, key: number, list: this) => boolean): T | null {
    let i = -1
    for (let value of this) {
      if (callback(value, ++i, this) === true) {
        return value
      }
    }

    return null
  }

  findIndex(callback: (value: T, key: number, list: this) => boolean): number {
    let i = -1
    for (let value of this) {
      if (callback(value, ++i, this) === true) {
        return i
      }
    }

    return i
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
    let startNode = this.seekNode(start - 1)
    let spliced = new LinkedList<T>()
    let current = null

    if (deleteCount > 0) {
      spliced.firstNode = startNode.next
      let to = spliced.seekNode(deleteCount - 1)
      startNode.next = to.next
      to.next = null
    }

    for (let i = 0; i < items.length; i++) {
      startNode.next = new LinkedListNode(items[i], startNode.next)
    }

    return spliced
  }

  delete(value: T): T | null {
    let index = this.findIndex(eq(value))
    if (index === -1) return null
    return this.splice(index, 1).head()
  }

  includes(value: T): boolean {
    for (let v of this) {
      if (value === v) {
        return true
      }
    }

    return false
  }

  join(delimiter: string): string {
    return this.reduce((str, value) => `${str},${value}`)
  }

  get(index: number): T {
    return this.seekNode(index).value
  }

  reverse(): this {
    let current = this.firstNode
    let prev = null
    let next = null

    while (current !== null) {
      next = current.next

      current.next = prev

      prev = current
      current = next
    }

    this.lastNode = this.firstNode
    this.firstNode = prev

    return this
  }

  toArray(): T[] {
    return Array.from(this)
  }

  toJSON(): T[] {
    return this.toArray()
  }

  private seekNode(index: number): LinkedListNode<T> {
    if (index < 0 || this.firstNode === null) {
      throw new Error(`Index ${index} is out of bounds!`)
    }

    let node = this.firstNode
    while (index--) {
      if (node === null || node.next === null) {
        throw new Error('Out of bounds!')
      }

      node = node.next
    }

    return node
  }

  private isIterable<T>(iterable: any): iterable is Iterable<T> {
    return iterable != null && typeof iterable[Symbol.iterator] !== 'undefined'
  }
}
