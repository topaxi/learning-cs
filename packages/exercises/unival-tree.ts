import { BinaryTreeNode } from '../data-structures/tree/binary-tree-node'

export function isUnivalTree<T>(node: BinaryTreeNode<T> | null): boolean {
  if (node === null) return true
  if (node.left === null && node.right === null) return true
  if (node.left !== null && !node.equals(node.left)) return false
  if (node.right !== null && !node.equals(node.right)) return false

  return isUnivalTree(node.left) && isUnivalTree(node.right)
}
