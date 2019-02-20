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

    it('should remove elements from beginning of list', () => {
      let list = LinkedList.of(1, 2, 3, 4, 5)

      expect(list.splice(0, 3).toArray()).to.deep.equal([1, 2, 3])
      expect(list.toArray()).to.deep.equal([4, 5])
    })

    it('should add elements to list', () => {
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

  describe('#pop()', () => {
    it('should remove and return last element', () => {
      let list = LinkedList.of(1, 2, 3)

      expect(list.pop()).to.equal(3)
      expect(list.toArray()).to.deep.equal([1, 2])
      expect(list.pop()).to.equal(2)
      expect(list.toArray()).to.deep.equal([1])
      expect(list.pop()).to.equal(1)
      expect(list.toArray()).to.deep.equal([])
      expect(() => list.pop()).to.throw(/Out of bounds!/)
    })
  })

  describe('#reverse()', () => {
    it('should reverse list in place', () => {
      expect(
        LinkedList.of(1, 2, 3)
          .reverse()
          .toArray()
      ).to.deep.equal([3, 2, 1])

      expect(
        LinkedList.of(1, 2)
          .reverse()
          .toArray()
      ).to.deep.equal([2, 1])

      expect(
        LinkedList.of(1)
          .reverse()
          .toArray()
      ).to.deep.equal([1])

      expect(new LinkedList().reverse().toArray()).to.deep.equal([])
    })
  })

  describe('#join()', () => {
    it('should join elements to a string', () => {
      let list = LinkedList.of(1, 2, 3)

      expect(list.join()).to.equal('1,2,3')
      expect(list.join('')).to.equal('123')
      expect(list.join('|')).to.equal('1|2|3')
    })
  })
})
