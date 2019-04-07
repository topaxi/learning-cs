import { swap } from '../../utils'

export abstract class Heap<T> {
  private readonly memory: T[] = []

  constructor(private readonly comparator: (a: T, b: T) => number) {}

  get empty(): boolean {
    return this.memory.length === 0
  }

  value(i: number): T {
    return this.memory[i]
  }

  peek(): T | null {
    return this.empty ? null : this.value(0)
  }

  left(i: number): number {
    return i * 2 + 1
  }

  right(i: number): number {
    return i * 2 + 2
  }

  getParentIndex(i: number): number {
    return Math.floor(i / 2)
  }

  parent(i: number): T {
    return this.value(this.getParentIndex(i))
  }

  push(value: T): void {
    this.memory.push(value)
    this.heapifyUp()
  }

  pop(): T | null {
    if (this.memory.length === 0) {
      return null
    }

    if (this.memory.length === 1) {
      let value = this.memory.pop()
      return value === undefined ? null : value
    }

    const value = this.memory[0]

    this.memory[0] = this.memory.pop()!
    this.heapifyDown()

    return value
  }

  toString(): string {
    return this.memory.toString()
  }

  toArray(): T[] {
    return [...this.memory]
  }

  toJSON(): T[] {
    return [...this.memory]
  }

  private swap(indexOne: number, indexTwo: number): void {
    swap(this.memory, indexOne, indexTwo)
  }

  private heapifyUp(): void {
    let current = this.memory.length - 1

    while (this.comparator(this.parent(current), this.value(current)) > 0) {
      this.swap(current, this.getParentIndex(current))
      current = this.getParentIndex(current)
    }
  }

  private hasLeftChild(parentIndex: number): boolean {
    return this.left(parentIndex) < this.memory.length
  }

  private hasRightChild(parentIndex: number): boolean {
    return this.right(parentIndex) < this.memory.length
  }

  private heapifyDown(): void {
    let current = 0
    let next = null

    while (this.hasLeftChild(current)) {
      let left = this.left(current)

      if (
        this.hasRightChild(current) &&
        this.comparator(this.value(this.right(current)), this.value(left)) <= 0
      ) {
        next = this.right(current)
      } else {
        next = left
      }

      if (this.comparator(this.value(current), this.value(next)) <= 0) {
        break
      }

      this.swap(current, next)
      current = next
    }
  }
}
