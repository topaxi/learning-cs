import { LinkedList } from '../list/linked-list'

export class Stack<T> {
  private readonly list = new LinkedList<T>()

  static from<T>(iterable: Iterable<T>) {
    let stack = new this<T>()

    for (let value of iterable) stack.push(value)

    return stack
  }

  static of<T>(...args: T[]) {
    return this.from(args)
  }

  get empty(): boolean {
    return this.list.empty
  }

  push(...values: T[]) {
    this.list.unshift(...values)
  }

  pop(): T {
    return this.list.shift()
  }

  peek(): T | null {
    return this.list.head()
  }

  *consume(): IterableIterator<T> {
    while (!this.empty) {
      yield this.pop()
    }
  }

  toString(): string {
    return this.list.toString()
  }
}
