import { BinarySearchTreeNode } from './binary-search-tree-node'

export class BinarySearchTree<T> implements Iterable<T> {
  protected root: BinarySearchTreeNode<T> | null = null

  static from<U>(iterable: Iterable<U>) {
    let tree = new this<U>()

    for (let value of iterable) {
      tree.insert(value)
    }

    return tree
  }

  static of<U>(...values: U[]) {
    return this.from(values)
  }

  constructor(
    protected readonly compare: (a: T, b: T) => number = (a: any, b: any) =>
      a - b
  ) {}

  get balanceFactor(): number {
    return this.root === null ? 0 : this.root.balanceFactor
  }

  insert(value: T): BinarySearchTreeNode<T> {
    if (this.root === null) {
      this.root = new BinarySearchTreeNode(value, this.compare)

      return this.root
    }

    return this.root.insert(value)
  }

  includes(value: T): boolean {
    return this.root !== null && this.root.includes(value)
  }

  findMin(): T | null {
    return this.root && this.root.findMin()
  }

  findMax(): T | null {
    return this.root && this.root.findMax()
  }

  toJSON(): BinarySearchTreeNode<T> | null {
    return this.root
  }

  *[Symbol.iterator](): IterableIterator<T> {
    if (this.root !== null) {
      yield* this.root
    }
  }
}
