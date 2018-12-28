import { BinarySearchTreeNode } from './binary-search-tree-node'

export class BinarySearchTree<T> {
  protected root: BinarySearchTreeNode<T> | null = null

  constructor(protected readonly compare = (a: any, b: any) => a - b) {}

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
}
