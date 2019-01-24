import { expect } from 'chai'
import { BinaryTreeNode } from '../data-structures/tree/binary-tree-node'
import { isUnivalTree } from './unival-tree'

describe('isUnivalTree', () => {
  it('should return false if node is not a universal value tree', () => {
    let root = new BinaryTreeNode(0)
    root.right = new BinaryTreeNode(0)
    root.right.left = new BinaryTreeNode(1)

    expect(isUnivalTree(root)).to.be.false
  })

  it('should return true if node is a universal value tree', () => {
    let root = new BinaryTreeNode(0)
    expect(isUnivalTree(root)).to.be.true
    root.right = new BinaryTreeNode(0)
    expect(isUnivalTree(root)).to.be.true
    expect(isUnivalTree(root.right)).to.be.true
    root.right.right = new BinaryTreeNode(0)
    expect(isUnivalTree(root)).to.be.true
    expect(isUnivalTree(root.right)).to.be.true
    root.left = new BinaryTreeNode(0)
    expect(isUnivalTree(root)).to.be.true
    expect(isUnivalTree(root.right)).to.be.true
    expect(isUnivalTree(root.left)).to.be.true
    root.left.right = new BinaryTreeNode(0)
    expect(isUnivalTree(root)).to.be.true
    expect(isUnivalTree(root.right)).to.be.true
    expect(isUnivalTree(root.left)).to.be.true
  })
})
