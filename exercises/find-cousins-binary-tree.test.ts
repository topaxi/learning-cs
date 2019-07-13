import { areCousins } from './find-cousins-binary-tree'
import { BinaryTreeNode } from '../data-structures/tree/binary-tree-node'

describe('993. Cousins in Binary Tree', () => {
  test('returns true if values are cousins', () => {
    let root = new BinaryTreeNode(0)
    root.left = new BinaryTreeNode(1)
    root.right = new BinaryTreeNode(2)

    expect(areCousins(root, 1, 2)).toBe(false)

    root = new BinaryTreeNode(0)
    root.left = new BinaryTreeNode(1)
    root.left.left = new BinaryTreeNode(2)

    expect(areCousins(root, 1, 2)).toBe(false)

    root = new BinaryTreeNode(0)
    root.left = new BinaryTreeNode(1)
    root.left.left = new BinaryTreeNode(2)
    root.right = new BinaryTreeNode(3)
    root.right.right = new BinaryTreeNode(4)

    expect(areCousins(root, 2, 4)).toBe(true)
  })
})
