import { expect } from 'chai'
import { BinarySearchTree } from './binary-search-tree'

describe('BinarySearchTree', () => {
  describe('#includes()', () => {
    it('should return true if value is in tree', () => {
      let tree = new BinarySearchTree()

      tree.insert(5)
      tree.insert(1)
      tree.insert(7)

      expect(tree.includes(5)).to.be.true
      expect(tree.includes(7)).to.be.true
      expect(tree.includes(1)).to.be.true
    })

    it('should return false if value is in tree', () => {
      let tree = new BinarySearchTree()

      tree.insert(5)
      tree.insert(1)
      tree.insert(7)

      expect(tree.includes(0)).to.be.false
      expect(tree.includes(2)).to.be.false
      expect(tree.includes(3)).to.be.false
      expect(tree.includes(4)).to.be.false
      expect(tree.includes(6)).to.be.false
      expect(tree.includes(8)).to.be.false
    })
  })

  describe('#findMin()', () => {
    it('should return minimum value of tree', () => {
      let tree = new BinarySearchTree()

      tree.insert(5)
      tree.insert(1)
      tree.insert(7)
      tree.insert(2)
      tree.insert(3)

      expect(tree.findMin()).to.equal(1)
    })
  })

  describe('#findMax()', () => {
    it('should return maximum value of tree', () => {
      let tree = new BinarySearchTree()

      tree.insert(5)
      tree.insert(1)
      tree.insert(7)
      tree.insert(2)
      tree.insert(3)

      expect(tree.findMax()).to.equal(7)
    })
  })
})
