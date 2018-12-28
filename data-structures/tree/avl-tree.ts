import { BinarySearchTree } from './binary-search-tree'
import { BinarySearchTreeNode } from './binary-search-tree-node'

export class AvlTree<T> extends BinarySearchTree<T> {
  insert(value: T) {
    let node = super.insert(value)
    let currentNode: BinarySearchTreeNode<T> | null = node

    // Walk up and balance each node
    while (currentNode) {
      this.balance(currentNode)
      currentNode = currentNode.parent
    }

    return node
  }

  private balance(node: BinarySearchTreeNode<T>): void {
    if (node.balanceFactor === 0) return

    // AvlTree can have an imbalanceFactor of at most 1
    if (node.balanceFactor > 1) {
      if (node.left !== null && node.left.balanceFactor > 0) {
        this.rotateLeftLeft(node)
      } else if (node.left !== null && node.left.balanceFactor < 0) {
        this.rotateLeftRight(node)
      }
    } else if (node.balanceFactor < -1) {
      if (node.right !== null && node.right.balanceFactor > 0) {
        this.rotateRightLeft(node)
      } else if (node.right !== null && node.right.balanceFactor < 0) {
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

    if (parent !== null) {
      parent.left = left
    } else if (node === this.root) {
      this.root = left
    }

    node.left = left.right
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

    if (parent !== null) {
      parent.right = right
    } else if (node === this.root) {
      this.root = right
    }

    node.right = right.left
    right.left = node
  }
}
