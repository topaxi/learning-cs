import { BinarySearchTree } from '../data-structures/tree/binary-search-tree'

export function kSmallestBinarySearchTree(
  node: BinarySearchTree<number>,
  k: number
): number {
  for (let value of node) {
    if (--k === 0) return value
  }

  return -1
}
