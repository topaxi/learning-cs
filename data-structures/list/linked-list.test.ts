import { expect } from 'chai'
import { LinkedList } from './linked-list'

describe('LinkedList<T>', () => {
  describe('of()', () => {
    it('should create linked list with given elements', () => {
      let list = LinkedList.of(1, 2, 3)
      expect(list.toArray()).to.deep.equal([1, 2, 3])
    })
  })

  describe('#get()', () => {
    it('should return element of given index', () => {
      let list = LinkedList.of(1, 2, 3)
      expect(list.get(1)).to.equal(2)
    })
  })

  describe('#slice()', () => {
    it('should return sub list', () => {
      let list = LinkedList.of(1, 2, 3, 4, 5)

      expect(list.slice(1, 3).toArray()).to.deep.equal([2, 3])
    })

    it('should slice to end', () => {
      let list = LinkedList.of(1, 2, 3, 4, 5)

      expect(list.slice(2).toArray()).to.deep.equal([3, 4, 5])
    })
  })

  describe('#splice()', () => {
    it('should remove elements from list', () => {
      let list = LinkedList.of(1, 2, 3, 4, 5)

      expect(list.splice(1, 3).toArray()).to.deep.equal([2, 3, 4])
      expect(list.toArray()).to.deep.equal([1, 5])
    })

    it.skip('should add elements to list', () => {
      let list = LinkedList.of(1, 2, 5)

      expect(list.splice(2, 0, 3, 4).toArray()).to.deep.equal([])
      expect(list.toArray()).to.deep.equal([1, 2, 3, 4, 5])
    })

    it('should replace elements in list', () => {
      let list = LinkedList.of(1, 3, 3)

      expect(list.splice(1, 1, 2).toArray()).to.deep.equal([3])
      expect(list.toArray()).to.deep.equal([1, 2, 3])
    })
  })

  describe('#delete()', () => {
    it('should return deleted element', () => {
      let list = LinkedList.of(1, 2, 3)

      expect(list.delete(2)).to.equal(2)
      expect(list.toArray()).to.deep.equal([1, 3])
    })
  })
})
