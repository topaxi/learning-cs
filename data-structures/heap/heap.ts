import { swap } from '../../utils/swap'

export abstract class Heap<T> {
  private readonly memory: T[] = []

  constructor(private readonly comparator: (a: T, b: T) => number) {}

  get empty() {
    return this.memory.length === 0
  }

  value(i: number) {
    return this.memory[i]
  }

  peek() {
    return this.empty ? null : this.value(0)
  }

  left(i: number) {
    return i * 2 + 1
  }

  right(i: number) {
    return i * 2 + 2
  }

  getParentIndex(i: number) {
    return Math.floor(i / 2)
  }

  parent(i: number) {
    return this.value(this.getParentIndex(i))
  }

  push(value: T) {
    this.memory.push(value)
    this.heapifyUp()
  }

  pop() {
    if (this.memory.length === 0) {
      return null
    }

    if (this.memory.length === 1) {
      return this.memory.pop()
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

  private heapifyUp() {
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

  private heapifyDown() {
    let current = 0
    let next = null

    while (this.hasLeftChild(current)) {
      let left = this.left(current)

      if (
        this.hasRightChild(current) &&
        this.comparator(this.value(left), this.value(this.right(current))) <= 0
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
