import { Stack } from '../stack'

export class Queue<T> {
  private stackNewest = new Stack<T>()
  private stackOldest = new Stack<T>()

  get empty(): boolean {
    return this.stackOldest.empty && this.stackNewest.empty
  }

  enqueue(...values: T[]): this {
    this.stackNewest.push(...values)
    return this
  }

  dequeue(): T {
    this.moveNewestToOldest()
    return this.stackOldest.pop()
  }

  peek(): T | null {
    this.moveNewestToOldest()
    return this.stackOldest.peek()
  }

  *consume(): IterableIterator<T> {
    while (!this.empty) {
      yield this.dequeue()
    }
  }

  private moveNewestToOldest(): void {
    this.stackOldest.push(...this.stackNewest.consume())
  }
}
