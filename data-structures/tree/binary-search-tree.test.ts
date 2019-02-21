import { BinarySearchTree } from './binary-search-tree'

describe('BinarySearchTree', () => {
  describe('#includes()', () => {
    test('should return true if value is in tree', () => {
      let tree = new BinarySearchTree()

      tree.insert(5)
      tree.insert(1)
      tree.insert(7)

      expect(tree.includes(5)).toBe(true)
      expect(tree.includes(7)).toBe(true)
      expect(tree.includes(1)).toBe(true)
    })

    test('should return false if value is in tree', () => {
      let tree = new BinarySearchTree()

      tree.insert(5)
      tree.insert(1)
      tree.insert(7)

      expect(tree.includes(0)).toBe(false)
      expect(tree.includes(2)).toBe(false)
      expect(tree.includes(3)).toBe(false)
      expect(tree.includes(4)).toBe(false)
      expect(tree.includes(6)).toBe(false)
      expect(tree.includes(8)).toBe(false)
    })
  })

  describe('#findMin()', () => {
    test('should return minimum value of tree', () => {
      let tree = new BinarySearchTree()

      tree.insert(5)
      tree.insert(1)
      tree.insert(7)
      tree.insert(2)
      tree.insert(3)

      expect(tree.findMin()).toBe(1)
    })
  })

  describe('#findMax()', () => {
    test('should return maximum value of tree', () => {
      let tree = new BinarySearchTree()

      tree.insert(5)
      tree.insert(1)
      tree.insert(7)
      tree.insert(2)
      tree.insert(3)

      expect(tree.findMax()).toBe(7)
    })
  })
})
