import { LinkedList } from '../list/linked-list'

export class Stack<T> {
  private readonly list = new LinkedList<T>()

  get empty(): boolean {
    return this.list.empty
  }

  push(value: T) {
    this.list.unshift(value)
  }

  pop(): T {
    return this.list.shift()
  }

  peek(): T | null {
    return this.list.head()
  }

  toString(): string {
    return this.list.toString()
  }
}
