import { BinaryTreeNode } from './binary-tree-node'

describe('BinaryTreeNode<T>', () => {
  describe('#toJSON()', () => {
    test('should serialize to JSON', () => {
      let node = new BinaryTreeNode('root')
      node.left = new BinaryTreeNode('left')
      node.right = new BinaryTreeNode('right')
      node.right.right = new BinaryTreeNode('rightright')
      node.right.left = new BinaryTreeNode('rightleft')

      expect(node).toMatchSnapshot()
    })
  })

  describe('#height', () => {
    test('should return tree height', () => {
      let node = new BinaryTreeNode('root')
      node.left = new BinaryTreeNode('left')
      node.right = new BinaryTreeNode('right')
      node.right.right = new BinaryTreeNode('rightright')
      node.right.left = new BinaryTreeNode('rightleft')

      expect(node.height).toBe(2)
      expect(node.leftHeight).toBe(1)
      expect(node.rightHeight).toBe(2)
    })
  })

  describe('#balanceFactor', () => {
    test('should return tree balance factor', () => {
      let node = new BinaryTreeNode('root')
      node.left = new BinaryTreeNode('left')
      node.right = new BinaryTreeNode('right')
      node.right.right = new BinaryTreeNode('rightright')
      node.right.left = new BinaryTreeNode('rightleft')

      expect(node.balanceFactor).toBe(-1)
      expect(node.right.balanceFactor).toBe(0)
    })
  })

  describe('#parent', () => {
    test('should return parent node', () => {
      let node = new BinaryTreeNode('root')
      node.left = new BinaryTreeNode('left')
      node.right = new BinaryTreeNode('right')
      node.right.right = new BinaryTreeNode('rightright')
      node.right.left = new BinaryTreeNode('rightleft')

      expect(node.parent).toBeNull()
      expect(node.left.parent).toBe(node)
      expect(node.right.parent).toBe(node)
      expect(node.right.left.parent).toBe(node.right)
      expect(node.right.right.parent).toBe(node.right)
    })
  })

  describe('#equals()', () => {
    test('should return whether two node values are equal', () => {
      expect(
        new BinaryTreeNode('root').equals(new BinaryTreeNode('root'))
      ).toBe(true)
      expect(new BinaryTreeNode('foo').equals(new BinaryTreeNode('bar'))).toBe(
        false
      )
    })
  })
})
