import { identity } from '../../utils/function/identity'
import { map } from '../../utils/iterator/map'
import { LinkedList } from '../list/linked-list'

export class Stack<T> {
  private readonly list = new LinkedList<T>()

  static from<T, R = T>(
    iterable: Iterable<T>,
    project: (value: T, i: number) => R = identity as any
  ) {
    return new this<R>().push(...map(iterable, project))
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
