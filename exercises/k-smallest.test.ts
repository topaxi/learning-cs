import { range, shuffleInplace } from '../utils'
import { AvlTree } from '../data-structures'
import { kSmallestBinarySearchTree } from './k-smallest'

describe('k-smallest', () => {
  describe('using binary tree', () => {
    test('should return k smallest value', () => {
      let values = shuffleInplace(Array.from(range(20)))
      let tree = AvlTree.from(values)

      expect(kSmallestBinarySearchTree(tree, 0)).toBe(-1)
      expect(kSmallestBinarySearchTree(tree, 1)).toBe(0)
      expect(kSmallestBinarySearchTree(tree, 5)).toBe(4)
    })
  })
})
