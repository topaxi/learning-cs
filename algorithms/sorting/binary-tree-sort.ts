import { AvlTree } from '../../data-structures'

export function defaultCompare(a: any, b: any): number {
  return a - b
}

export function binaryTreeSort<T>(
  list: readonly T[],
  compare: (a: T, b: T) => number = defaultCompare
) {
  let tree = new AvlTree<T>(compare)

  for (let i = 0; i < list.length; i++) {
    tree.insert(list[i])
  }

  return Array.from(tree)
}
