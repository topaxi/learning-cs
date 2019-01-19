import { LinkedList } from '../list/linked-list'

export class Queue<T> {
  private readonly list = new LinkedList<T>()

  get empty(): boolean {
    return this.list.empty
  }

  get length(): number {
    return this.list.size()
  }

  enqueue(...values: T[]): this {
    this.list.push(...values)

    return this
  }

  dequeue(): T {
    return this.list.shift()
  }

  peek(): T | null {
    return this.list.head()
  }

  *consume(): IterableIterator<T> {
    while (!this.empty) {
      yield this.dequeue()
    }
  }

  toString(): string {
    return this.list.toString()
  }
}
