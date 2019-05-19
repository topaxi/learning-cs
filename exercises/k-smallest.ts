import { BinarySearchTree } from '../data-structures/tree/binary-search-tree'
import { take } from '../utils/iterator/take'
import { last } from '../utils/iterator/last'

export function kSmallestBinarySearchTree(
  node: BinarySearchTree<number>,
  k: number
): number {
  let smallest = last(take(node, k))

  return smallest === undefined ? -1 : smallest
}
