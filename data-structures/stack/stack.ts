import { LinkedList } from '../list'

export class Stack<T> {
  private readonly list = new LinkedList<T>()

  static from<T>(iterable: Iterable<T>) {
    return new this<T>().push(...iterable)
  }

  static of<T>(...args: T[]) {
    return this.from(args)
  }

  get empty(): boolean {
    return this.list.empty
  }

  push(...values: T[]): this {
    this.list.unshift(...values)
    return this
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

  toJSON(): T[] {
    return this.list.toJSON()
  }

  toString(): string {
    return this.list.toString()
  }
}
