import { head, tail } from '../../utils/array'
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

    test('should return null if element does not exist', () => {
      let list = LinkedList.of(1, 2, 3)

      expect(list.delete(4)).toBe(null)
      expect(list.toArray()).toEqual([1, 2, 3])
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

    test('should cleanup lastNode', () => {
      let list = LinkedList.of(1)

      list.pop()

      expect(list['lastNode']).toBeNull()

      list.push(1, 2)

      expect(list['lastNode']).not.toBeNull()

      list.pop()
      list.pop()

      expect(list['lastNode']).toBeNull()
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

  describe('#flat()', () => {
    test('should flatten list', () => {
      let list = LinkedList.of(
        LinkedList.of(1, 2),
        LinkedList.of(3, 4),
        LinkedList.of(5, 6)
      )

      expect(list.flat().join('|')).toBe('1|2|3|4|5|6')
    })
  })

  describe('#toString()', () => {
    test('should return list values separated by a comma', () => {
      expect(LinkedList.of(1, 2, 3).toString()).toBe('1,2,3')
    })
  })

  describe('#head()', () => {
    test('should return head element', () => {
      expect(LinkedList.of().head()).toBeNull()
      expect(LinkedList.of(1).head()).toBe(1)
      expect(LinkedList.of(1, 2).head()).toBe(1)
    })

    test('should implement IHead interface', () => {
      expect(head(LinkedList.of())).toBeNull()
      expect(head(LinkedList.of(1))).toBe(1)
      expect(head(LinkedList.of(1, 2))).toBe(1)
    })
  })

  describe('#tail()', () => {
    test('should return the tail of the list', () => {
      expect(Array.from(LinkedList.of(1, 2, 3).tail())).toEqual([2, 3])
      expect(Array.from(LinkedList.of(1).tail())).toEqual([])
      expect(Array.from(new LinkedList().tail())).toEqual([])
    })

    test('should work with tail helper', () => {
      expect(Array.from(tail(LinkedList.of(1, 2)))).toEqual([2])
    })
  })

  describe('#map()', () => {
    test('should map to a new list', () => {
      expect(LinkedList.of(1, 2, 3).map(n => n + 1)).toEqual(
        LinkedList.of(2, 3, 4)
      )
    })
  })

  describe('#filter()', () => {
    test('should filter list', () => {
      expect(LinkedList.of(1, 2, 3, 4).filter(n => n > 2)).toEqual(
        LinkedList.of(3, 4)
      )
    })
  })

  describe('#includes()', () => {
    test('should return whether the value is included or not', () => {
      let list = LinkedList.of(1, 2, 3, 4)
      expect(list.includes(3)).toBe(true)
      expect(list.includes(5)).toBe(false)
      expect(list.includes(0)).toBe(false)
    })
  })

  describe('#toJSON()', () => {
    test('should serialize to an array', () => {
      expect(LinkedList.of(1, 2, 3).toJSON()).toEqual([1, 2, 3])
    })
  })

  describe('#entries()', () => {
    test('should return index/value pairs', () => {
      let list = LinkedList.of('a', 'b', 'c', 'd')

      expect(Array.from(list.entries())).toEqual([
        [0, 'a'],
        [1, 'b'],
        [2, 'c'],
        [3, 'd']
      ])
    })
  })

  describe('#keys()', () => {
    test('should return index numbers', () => {
      let list = LinkedList.of('a', 'b', 'c', 'd')

      expect(Array.from(list.keys())).toEqual([0, 1, 2, 3])
    })
  })

  describe('#values()', () => {
    test('should return values', () => {
      let list = LinkedList.of('a', 'b', 'c', 'd')

      expect(Array.from(list.values())).toEqual(['a', 'b', 'c', 'd'])
    })
  })

  describe('#[Symbol.iterator]()', () => {
    test('should return values', () => {
      let list = LinkedList.of('a', 'b', 'c', 'd')

      expect(Array.from(list)).toEqual(['a', 'b', 'c', 'd'])
    })
  })
})
