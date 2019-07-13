import { BinaryTreeNode } from '../data-structures/tree/binary-tree-node'

export function areCousins<T>(root: BinaryTreeNode<T>, x: T, y: T) {
  let queue = [null, root, 0]
  let xDepth = -1
  let yDepth = -1
  let xParent = null
  let yParent = null

  while (queue.length !== 0) {
    let parent = queue.shift() as BinaryTreeNode<T> | null
    let node = queue.shift() as BinaryTreeNode<T> | null
    let depth = queue.shift() as number

    if (node === null) continue

    if (node.value === x) {
      xDepth = depth
      xParent = parent
    }
    if (node.value === y) {
      yDepth = depth
      yParent = parent
    }

    if (xDepth !== -1 && yDepth !== -1) {
      return xParent !== yParent && xDepth === yDepth
    }

    queue.push(node, node.left, depth + 1, node, node.right, depth + 1)
  }

  return false
}
