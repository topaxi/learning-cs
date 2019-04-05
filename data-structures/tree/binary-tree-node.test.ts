import { BinaryTreeNode } from './binary-tree-node'

describe('BinaryTreeNode<T>', () => {
  describe('#toJSON()', () => {
    test('should serialize to JSON', () => {
      let node = new BinaryTreeNode('root')
      node.left = new BinaryTreeNode('left')
      node.right = new BinaryTreeNode('right')
      node.right.right = new BinaryTreeNode('rightright')
      node.right.left = new BinaryTreeNode('rightleft')

      expect(JSON.parse(JSON.stringify(node))).toMatchSnapshot()
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

  describe('traversals', () => {
    let node: BinaryTreeNode<string>

    beforeEach(() => {
      let root = new BinaryTreeNode('F')

      root.left = new BinaryTreeNode('B')
      root.left.left = new BinaryTreeNode('A')
      root.left.right = new BinaryTreeNode('D')
      root.left.right.left = new BinaryTreeNode('C')
      root.left.right.right = new BinaryTreeNode('E')

      root.right = new BinaryTreeNode('G')
      root.right.right = new BinaryTreeNode('I')
      root.right.right.left = new BinaryTreeNode('H')

      node = root
    })

    describe('#traverseInOrder()', () => {
      test('should traverse in order', () => {
        expect(
          Array.from(node.traverseInOrder()).join()
        ).toMatchInlineSnapshot(`"A,B,C,D,E,F,G,H,I"`)
      })
    })

    describe('#traversePreOrder()', () => {
      test('should traverse pre order', () => {
        expect(
          Array.from(node.traversePreOrder()).join()
        ).toMatchInlineSnapshot(`"F,B,A,D,C,E,G,I,H"`)
      })
    })

    describe('#traversePostOrder()', () => {
      test('should traverse post order', () => {
        expect(
          Array.from(node.traversePostOrder()).join()
        ).toMatchInlineSnapshot(`"A,C,E,D,B,H,I,G,F"`)
      })
    })

    describe('#traverseOutOrder()', () => {
      test('should traverse out order', () => {
        expect(
          Array.from(node.traverseOutOrder()).join()
        ).toMatchInlineSnapshot(`"I,H,G,F,E,D,C,B,A"`)
      })
    })
  })
})
