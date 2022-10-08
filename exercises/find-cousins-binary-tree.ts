import { Queue } from '../data-structures/queue/queue'
import { BinaryTreeNode } from '../data-structures/tree/binary-tree-node'

export function areCousins<T>(root: BinaryTreeNode<T>, x: T, y: T) {
  let queue = Queue.of<BinaryTreeNode<T> | number | null>(null, root, 0)
  let xDepth = -1
  let yDepth = -1
  let xParent = null
  let yParent = null

  while (queue.length !== 0) {
    let parent = queue.dequeue() as BinaryTreeNode<T> | null
    let node = queue.dequeue() as BinaryTreeNode<T> | null
    let depth = queue.dequeue() as number

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

    queue.enqueue(node, node.left, depth + 1, node, node.right, depth + 1)
  }

  return false
}
