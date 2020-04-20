import { AvlTree } from '../../data-structures/tree/avl-tree'
import { define, ListType } from './utils'

export const binaryTreeSort = define((list, compare) => {
  let tree = new AvlTree<ListType<typeof list>>(compare)

  for (let value of list) {
    tree.insert(value)
  }

  return Array.from(tree)
})
