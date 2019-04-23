import { lastIndex } from '../../utils/array/last-index'
import { swap } from '../../utils/swap'

export class Heap<T> {
  private readonly memory: T[] = []

  constructor(private readonly comparator: (a: T, b: T) => number) {}

  get empty(): boolean {
    return this.memory.length === 0
  }

  get size(): number {
    return this.memory.length
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
    return Math.floor((i - 1) / 2)
  }

  parent(i: number): T {
    return this.value(this.getParentIndex(i))
  }

  push(...values: T[]): void {
    for (let i = 0; i < values.length; i++) {
      this.memory.push(values[i])
      this.heapifyUp()
    }
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

  indexOf(value: T): number {
    return this.memory.indexOf(value)
  }

  includes(value: T): boolean {
    return this.indexOf(value) !== -1
  }

  deleteAt(index: number): T | null {
    if (index < 0) return null
    if (index === lastIndex(this.memory)) return this.memory.pop()!

    let value = this.value(index)
    this.memory[index] = this.memory.pop()!

    let parent = this.parent(index)

    if (
      this.hasLeftChild(index) &&
      (!parent || this.comparator(parent, this.value(index)) <= 0)
    ) {
      this.heapifyDown(index)
    } else {
      this.heapifyUp(index)
    }

    return value
  }

  delete(value: T): T | null {
    return this.deleteAt(this.indexOf(value))
  }

  toString(): string {
    return this.memory.toString()
  }

  toJSON(): T[] {
    return [...this.memory]
  }

  *consume(): IterableIterator<T> {
    while (!this.empty) yield this.pop()!
  }

  private swap(indexOne: number, indexTwo: number): void {
    swap(this.memory, indexOne, indexTwo)
  }

  private heapifyUp(index = lastIndex(this.memory)): void {
    let current = index

    while (
      this.getParentIndex(current) >= 0 &&
      this.comparator(this.parent(current), this.value(current)) > 0
    ) {
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

  private heapifyDown(index = 0): void {
    let current = index
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
