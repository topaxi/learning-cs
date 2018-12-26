import { LinkedList } from '../list/linked-list'

export class Queue<T> {
  private readonly list = new LinkedList<T>()

  get empty(): boolean {
    return this.list.empty
  }

  enqueue(value: T) {
    this.list.push(value)
  }

  dequeue(): T {
    return this.list.shift()
  }

  peek(): T | null {
    return this.list.head()
  }

  toString(): string {
    return this.list.toString()
  }
}
