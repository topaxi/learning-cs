import { Queue } from '../data-structures/queue/queue'

export interface BinaryTreeNode {
  val: number
  left: BinaryTreeNode | null
  right: BinaryTreeNode | null
}

export function rightSideView(root: BinaryTreeNode): number[] {
  let nodes = []
  let currentDepth = -1
  let queue = Queue.of<[BinaryTreeNode | null, number]>([
    root,
    currentDepth + 1
  ])
  let lastNode = null

  for (let [node, depth] of queue) {
    if (depth !== currentDepth && lastNode !== null) {
      nodes.push(lastNode.val)
    }

    currentDepth = Math.max(currentDepth, depth)

    if (node === null) continue

    lastNode = node

    queue.enqueue([node.left, depth + 1], [node.right, depth + 1])
  }

  return nodes
}
