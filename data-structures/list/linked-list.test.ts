import { LinkedList } from './linked-list'

describe('LinkedList<T>', () => {
  describe('of()', () => {
    test('should create linked list with given elements', () => {
      let list = LinkedList.of(1, 2, 3)
      expect(list.toArray()).toEqual([1, 2, 3])
    })
  })

  describe('#get()', () => {
    test('should return element of given index', () => {
      let list = LinkedList.of(1, 2, 3)
      expect(list.get(1)).toBe(2)
    })
  })

  describe('#slice()', () => {
    test('should return sub list', () => {
      let list = LinkedList.of(1, 2, 3, 4, 5)

      expect(list.slice(1, 3).toArray()).toEqual([2, 3])
    })

    test('should slice to end', () => {
      let list = LinkedList.of(1, 2, 3, 4, 5)

      expect(list.slice(2).toArray()).toEqual([3, 4, 5])
    })
  })

  describe('#splice()', () => {
    test('should remove elements from list', () => {
      let list = LinkedList.of(1, 2, 3, 4, 5)

      expect(list.splice(1, 3).toArray()).toEqual([2, 3, 4])
      expect(list.toArray()).toEqual([1, 5])
    })

    test('should remove elements from beginning of list', () => {
      let list = LinkedList.of(1, 2, 3, 4, 5)

      expect(list.splice(0, 3).toArray()).toEqual([1, 2, 3])
      expect(list.toArray()).toEqual([4, 5])
    })

    test('should add elements to list', () => {
      let list = LinkedList.of(1, 2, 5)

      expect(list.splice(2, 0, 3, 4).toArray()).toEqual([])
      expect(list.toArray()).toEqual([1, 2, 3, 4, 5])
    })

    test('should replace elements in list', () => {
      let list = LinkedList.of(1, 3, 3)

      expect(list.splice(1, 1, 2).toArray()).toEqual([3])
      expect(list.toArray()).toEqual([1, 2, 3])
    })
  })

  describe('#delete()', () => {
    test('should return deleted element', () => {
      let list = LinkedList.of(1, 2, 3)

      expect(list.delete(2)).toBe(2)
      expect(list.toArray()).toEqual([1, 3])
    })
  })

  describe('#push()', () => {
    test('should append values', () => {
      let list = new LinkedList()

      list.push()

      expect(list.toArray()).toEqual([])

      list.push(1)

      expect(list.toArray()).toEqual([1])

      list.push(2, 3)

      expect(list.toArray()).toEqual([1, 2, 3])

      list.push(4, 5, 6)

      expect(list.toArray()).toEqual([1, 2, 3, 4, 5, 6])
    })
  })

  describe('#pop()', () => {
    test('should remove and return last element', () => {
      let list = LinkedList.of(1, 2, 3)

      expect(list.pop()).toBe(3)
      expect(list.toArray()).toEqual([1, 2])
      expect(list.pop()).toBe(2)
      expect(list.toArray()).toEqual([1])
      expect(list.pop()).toBe(1)
      expect(list.toArray()).toEqual([])
      expect(() => list.pop()).toThrow(/Out of bounds!/)
    })
  })

  describe('#reverse()', () => {
    test('should reverse list in place', () => {
      expect(
        LinkedList.of(1, 2, 3)
          .reverse()
          .toArray()
      ).toEqual([3, 2, 1])

      expect(
        LinkedList.of(1, 2)
          .reverse()
          .toArray()
      ).toEqual([2, 1])

      expect(
        LinkedList.of(1)
          .reverse()
          .toArray()
      ).toEqual([1])

      expect(new LinkedList().reverse().toArray()).toEqual([])
    })
  })

  describe('#join()', () => {
    test('should join elements to a string', () => {
      let list = LinkedList.of(1, 2, 3)

      expect(list.join()).toBe('1,2,3')
      expect(list.join('')).toBe('123')
      expect(list.join('|')).toBe('1|2|3')
    })

    test('should return empty string for empty list', () => {
      expect(new LinkedList().toString()).toBe('')
    })
  })

  describe('#concat()', () => {
    test('should concat lists', () => {
      let listA = LinkedList.of(1, 2, 3)
      let listB = LinkedList.of(4, 5, 6)

      expect(listA.concat(listB).toString()).toBe('1,2,3,4,5,6')
    })

    test('should accept iterable values', () => {
      let list = LinkedList.of(1, 2, 3)

      expect(list.concat([4, 5, 6]).toString()).toBe('1,2,3,4,5,6')
      expect(list.concat('4,5,6').toString()).toBe('1,2,3,4,5,6')
      expect(list.concat(new Set([4, 5, 6])).toString()).toBe('1,2,3,4,5,6')
    })

    test('should accept multiple lists', () => {
      let list = LinkedList.of(1)

      expect(
        list.concat([2], 3, new Set([4]), 5, LinkedList.of(6)).toString()
      ).toBe('1,2,3,4,5,6')
    })

    test('should work with empty lists', () => {
      let list = new LinkedList()

      expect(list.concat(new LinkedList()).toString()).toBe('')
      expect(list.concat(new LinkedList(), [1]).toString()).toBe('1')
    })
  })

  describe('#toString()', () => {
    test('should return list values separated by a comma', () => {
      expect(LinkedList.of(1, 2, 3).toString()).toBe('1,2,3')
    })
  })
})
