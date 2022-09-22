import { BinarySearchTree } from './binary-search-tree'
import { BinarySearchTreeNode } from './binary-search-tree-node'

export class AvlTree<T> extends BinarySearchTree<T> {
  override insert(value: T): BinarySearchTreeNode<T> {
    let node = super.insert(value)
    let currentNode: BinarySearchTreeNode<T> | null = node

    // Walk up and balance each node
    while (currentNode !== null) {
      this.balance(currentNode)
      currentNode = currentNode.parent
    }

    return node
  }

  private balance(node: BinarySearchTreeNode<T>): void {
    if (node.balanceFactor === 0) return

    // AvlTree can have an imbalanceFactor of at most 1
    if (node.balanceFactor > 1) {
      if (node.left!.balanceFactor > 0) {
        this.rotateLeftLeft(node)
      } else if (node.left!.balanceFactor < 0) {
        this.rotateLeftRight(node)
      }
    } else if (node.balanceFactor < -1) {
      if (node.right!.balanceFactor > 0) {
        this.rotateRightLeft(node)
      } else if (node.right!.balanceFactor < 0) {
        this.rotateRightRight(node)
      }
    }
  }

  /**
   *    10
   *    /
   *   5
   *  /
   * 4
   * ===>
   *   5
   *  / \
   * 4  10
   */
  private rotateLeftLeft(node: BinarySearchTreeNode<T>): void {
    let left = node.left!
    let parent = node.parent

    node.left = null

    if (parent !== null) {
      if (parent.left === node) {
        parent.left = left
      } else {
        parent.right = left
      }
    } else if (node === this.root) {
      this.root = left
    }

    if (left.right !== null) {
      node.left = left.right
    }

    left.right = node
  }

  /**
   *  10
   *  /
   * 5
   *  \
   *   6
   * ===>
   *    10
   *    /
   *   6
   *  /
   * 5
   * ===> rotateLeftLeft
   *   6
   *  / \
   * 5  10
   */
  private rotateLeftRight(node: BinarySearchTreeNode<T>): void {
    let left = node.left!
    let leftRight = left.right!

    node.left = null
    left.right = null

    if (leftRight.left !== null) {
      left.right = leftRight.left
      leftRight.left = null
    }

    node.left = leftRight
    leftRight.left = left

    this.rotateLeftLeft(node)
  }

  /**
   * 10
   *  \
   *  15
   *  /
   * 12
   * ===>
   * 10
   *  \
   *  12
   *   \
   *   15
   * ===> rotateRightRight
   *   12
   *  /  \
   * 10  15
   */
  private rotateRightLeft(node: BinarySearchTreeNode<T>): void {
    let right = node.right!
    let rightLeft = right.left!

    node.right = null
    right.left = null

    if (rightLeft.right !== null) {
      right.left = rightLeft.right
      rightLeft.right = null
    }

    node.right = rightLeft
    rightLeft.right = right

    this.rotateRightRight(node)
  }

  /**
   * 10
   *  \
   *   15
   *    \
   *    17
   * ===>
   *   15
   *  /  \
   * 10  17
   */
  private rotateRightRight(node: BinarySearchTreeNode<T>): void {
    let right = node.right!
    let parent = node.parent

    node.right = null

    if (parent !== null) {
      if (parent.right === node) {
        parent.right = right
      } else {
        parent.left = right
      }
    } else if (node === this.root) {
      this.root = right
    }

    if (right.left !== null) {
      node.right = right.left
    }

    right.left = node
  }
}
