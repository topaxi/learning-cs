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
    // this.memory.
  }

  toString(): string {
    return this.memory.toString()
  }

  toArray(): T[] {
    return [...this.memory]
  }

  private swap(indexOne: number, indexTwo: number): void {
    ;[this.memory[indexTwo], this.memory[indexOne]] = [
      this.memory[indexOne],
      this.memory[indexTwo]
    ]
  }

  private heapifyUp() {
    let current = this.memory.length - 1

    while (this.comparator(this.parent(current), this.value(current)) > 0) {
      this.swap(current, this.getParentIndex(current))
      current = this.getParentIndex(current)
    }
  }
}
