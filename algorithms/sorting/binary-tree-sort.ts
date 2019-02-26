import { AvlTree } from '../../data-structures/tree/avl-tree'
import { neg } from '../../utils/neg'

export function defaultCompare(a: any, b: any): number {
  return b - a
}

export function binaryTreeSort<T>(
  list: ReadonlyArray<T>,
  compare: (a: T, b: T) => number = defaultCompare
) {
  // TODO: Seems like binary tree compare and sort compare are reversed
  let tree = new AvlTree<T>(neg(compare))

  for (let i = 0; i < list.length; i++) {
    tree.insert(list[i])
  }

  return Array.from(tree)
}
