import { BinaryTreeNode } from '../data-structures/tree/binary-tree-node'
import { isUnivalTree } from './unival-tree'

describe('isUnivalTree', () => {
  test('should return false if node is not a universal value tree', () => {
    let root = new BinaryTreeNode(0)
    root.right = new BinaryTreeNode(0)
    root.right.left = new BinaryTreeNode(1)

    expect(isUnivalTree(root)).toBe(false)
  })

  test('should return true if node is a universal value tree', () => {
    let root = new BinaryTreeNode(0)
    expect(isUnivalTree(root)).toBe(true)
    root.right = new BinaryTreeNode(0)
    expect(isUnivalTree(root)).toBe(true)
    expect(isUnivalTree(root.right)).toBe(true)
    root.right.right = new BinaryTreeNode(0)
    expect(isUnivalTree(root)).toBe(true)
    expect(isUnivalTree(root.right)).toBe(true)
    root.left = new BinaryTreeNode(0)
    expect(isUnivalTree(root)).toBe(true)
    expect(isUnivalTree(root.right)).toBe(true)
    expect(isUnivalTree(root.left)).toBe(true)
    root.left.right = new BinaryTreeNode(0)
    expect(isUnivalTree(root)).toBe(true)
    expect(isUnivalTree(root.right)).toBe(true)
    expect(isUnivalTree(root.left)).toBe(true)
  })
})
