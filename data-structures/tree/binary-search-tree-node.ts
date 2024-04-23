import { BinaryTreeNode } from './binary-tree-node'

export class BinarySearchTreeNode<T, M = unknown> extends BinaryTreeNode<
  T,
  M
> {
  insert(value: T): this {
    if (this.value === null) {
      this.value = value

      return this
    }

    let compareResult = this.compare(value, this.value)

    if (compareResult < 0) {
      if (this.left !== null) {
        return this.left.insert(value)
      }

      return (this.left = new BinarySearchTreeNode(
        value,
        this.compare
      ) as this)
    }

    if (compareResult > 0) {
      if (this.right !== null) {
        return this.right.insert(value)
      }

      return (this.right = new BinarySearchTreeNode(
        value,
        this.compare
      ) as this)
    }

    return this
  }

  find(value: T): this | null {
    let compareResult = this.compare(value, this.value)

    if (compareResult === 0) {
      return this
    }

    if (compareResult < 0) {
      if (this.left === null) {
        return null
      }

      return this.left.find(value)
    }

    if (compareResult > 0) {
      if (this.right === null) {
        return null
      }

      return this.right.find(value)
    }

    return null
  }

  includes(value: T): boolean {
    return this.find(value) !== null
  }

  findMin(): T | null {
    if (this.left === null) {
      return this.value
    }

    return this.left.findMin()
  }

  findMax(): T | null {
    if (this.right === null) {
      return this.value
    }

    return this.right.findMax()
  }
}
