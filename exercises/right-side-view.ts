export interface BinaryTreeNode {
  val: number
  left: BinaryTreeNode | null
  right: BinaryTreeNode | null
}

export function rightSideView(root: BinaryTreeNode): number[] {
  let nodes = []
  let currentDepth = -1
  let queue: any[] = [root, currentDepth + 1]
  let lastNode = null

  while (queue.length) {
    let node = queue.shift()
    let depth = queue.shift()

    if (depth !== currentDepth && lastNode !== null) {
      nodes.push(lastNode.val)
    }

    currentDepth = Math.max(currentDepth, depth)

    if (node === null) continue

    lastNode = node

    queue.push(node.left, depth + 1, node.right, depth + 1)
  }

  return nodes
}
