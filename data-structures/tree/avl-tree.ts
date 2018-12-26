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

  private rotateLeftLeft(node: BinarySearchTreeNode<T>): void {}
  private rotateLeftRight(node: BinarySearchTreeNode<T>): void {}
  private rotateRightLeft(node: BinarySearchTreeNode<T>): void {}
  private rotateRightRight(node: BinarySearchTreeNode<T>): void {}
}
