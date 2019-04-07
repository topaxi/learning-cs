import { eq, concat, iter, prop, add, pa } from '../../utils'

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

const increment = pa(add, 1)

export class LinkedList<T> implements Iterable<T> {
  static of<T>(...values: T[]) {
    return this.from(values)
  }

  static from<T>(values: Iterable<T>) {
    return new this<T>().push(...values)
  }

  private firstNode: LinkedListNode<T> | null = null
  private lastNode: LinkedListNode<T> | null = null

  get empty(): boolean {
    return this.firstNode === null
  }

  unshift(...values: T[]): this {
    for (let i = 0; i < values.length; i++) {
      this.firstNode = new LinkedListNode(values[i], this.firstNode)
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
    if (this.firstNode === null) {
      throw new Error('Out of bounds!')
    }

    let value = this.firstNode.value

    this.firstNode = this.firstNode.next

    if (this.firstNode === null) {
      this.lastNode = null
    }

    return value
  }

  pop(): T {
    if (this.firstNode === null) {
      throw new Error('Out of bounds!')
    }

    let currentNode = this.firstNode

    if (currentNode.next === null) {
      this.firstNode = null

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

  reduce<A>(
    reducer: (accumulator: T | A, value: T, index: number, self: this) => A
  ): A
  reduce<A>(
    reducer: (accumulator: A, value: T, index: number, self: this) => A,
    initialValue: A
  ): A
  reduce<A>(
    reducer: (accumulator: unknown, value: T, index: number, self: this) => A,
    initialValue?: A
  ): A {
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

    return accumulator as A
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
  filter(
    filter: (value: T, index: number, list: this) => unknown
  ): LinkedList<T>
  filter(
    filter: (value: T, index: number, list: this) => unknown
  ): LinkedList<T> {
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
    return this.reduce(increment, 0)
  }

  concat(...lists: (Iterable<T> | T)[]): LinkedList<T>
  concat<S>(...lists: (Iterable<S> | S)[]): LinkedList<T | S>
  concat(...lists: (Iterable<unknown> | unknown)[]): LinkedList<unknown> {
    return lists
      .map(list =>
        typeof list !== 'string' && iter.isIterable(list)
          ? LinkedList.from(list)
          : LinkedList.of(list)
      )
      .filter(list => list.lastNode !== null)
      .reduce(this.concatReducer, LinkedList.from(this))
  }

  flat<U>(this: LinkedList<LinkedList<U>>): LinkedList<U> {
    return this.reduce<LinkedList<U>>(concat, new LinkedList<U>())
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

  entries(): IterableIterator<[number, T]> {
    return iter.map(this.nodes(), (node, i) => [i, node.value])
  }

  keys(): IterableIterator<number> {
    return iter.map(this.nodes(), (_node, i) => i)
  }

  values(): IterableIterator<T> {
    return iter.map(this.nodes(), prop('value'))
  }

  find(predicate: (value: T, key: number, list: this) => boolean): T | null {
    return this._find(predicate, value => value)
  }

  findIndex(
    predicate: (value: T, key: number, list: this) => boolean
  ): number {
    return this._find(predicate, (_value, index) => index)
  }

  private _find<U>(
    predicate: (value: T, key: number, list: this) => boolean,
    callback: (value: T | null, key: number, list: this) => U
  ): U {
    let i = -1
    for (let value of this) {
      if (predicate(value, ++i, this) === true) {
        return callback(value, i, this)
      }
    }

    return callback(null, -1, this)
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
    return this.indexOf(value) !== -1
  }

  indexOf(value: T): number {
    return this.findIndex(eq(value))
  }

  join(delimiter = ','): string {
    return this.firstNode === null
      ? ''
      : String(this.reduce((str, value) => `${str}${delimiter}${value}`))
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

  toString(): string {
    return this.join()
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

  private concatReducer<T>(
    acc: LinkedList<T>,
    list: LinkedList<T>
  ): LinkedList<T> {
    if (acc.lastNode === null) {
      acc.firstNode = list.firstNode
    } else {
      acc.lastNode.next = list.firstNode
    }

    acc.lastNode = list.lastNode

    return acc
  }
}
