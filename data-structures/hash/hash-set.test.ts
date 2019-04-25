import { HashSet } from './hash-set'

describe('HashSet<T>', () => {
  test('should detect values in set', () => {
    let set = new HashSet()

    set.add('test')

    expect(set.has('test')).toBe(true)
    expect(set.has('tes')).toBe(false)

    set.delete('test')

    expect(set.has('test')).toBe(false)

    set.add(1)

    expect(set.has(1)).toBe(true)
    expect(set.has(2)).toBe(false)

    set.delete(1)

    expect(set.has(1)).toBe(false)
    expect(set.has(2)).toBe(false)
  })

  test('should be iterable over all keys', () => {
    expect([...HashSet.of(1, 2, 3).keys()]).toEqual([1, 2, 3])
  })

  test('should be iterable over all values', () => {
    expect([...HashSet.of(1, 2, 3)]).toEqual([1, 2, 3])
    expect([...HashSet.of(1, 2, 3).values()]).toEqual([1, 2, 3])
  })

  describe('.of()', () => {
    test('should create set with given values', () => {
      let set = HashSet.of<number>(1, 2, 3)
      expect(set.has(0)).toBe(false)
      expect(set.has(1)).toBe(true)
      expect(set.has(2)).toBe(true)
      expect(set.has(3)).toBe(true)
      expect(set.has(4)).toBe(false)
    })
  })

  describe('.from()', () => {
    test('should create set from given iterable', () => {
      let set = HashSet.from<number>([1, 2, 3])
      expect(set.has(0)).toBe(false)
      expect(set.has(1)).toBe(true)
      expect(set.has(2)).toBe(true)
      expect(set.has(3)).toBe(true)
      expect(set.has(4)).toBe(false)
    })
  })

  describe('#clear()', () => {
    test('should remove all values from set', () => {
      let set = HashSet.of(1, 2)

      expect(set.has(1)).toBe(true)
      expect(set.has(2)).toBe(true)
      expect(set.size).toBe(2)

      set.clear()

      expect(set.size).toBe(0)
      expect(set.has(1)).toBe(false)
      expect(set.has(2)).toBe(false)
    })
  })

  describe('#union()', () => {
    test('should create an union of the given iterables', () => {
      let set = HashSet.of<number>(1)

      expect(set.union()).not.toBe(set)

      set = set.union(HashSet.of(2, 3))

      expect(set.toArray()).toEqual([1, 2, 3])

      set = set.union(HashSet.of(4), [5], [6, 7])

      expect(set.toArray()).toEqual([1, 2, 3, 4, 5, 6, 7])
    })
  })

  describe('#difference()', () => {
    test('should return the difference of the given iterables', () => {
      let set = HashSet.of<number>(1, 2)

      expect(set.difference()).not.toBe(set)
      expect(set.difference(HashSet.of(2, 3)).toArray()).toEqual([1])
      expect(set.difference([1], [2]).toArray()).toEqual([])
    })
  })

  describe('#intersection()', () => {
    test('should return the intersection of the given iterables', () => {
      let set = HashSet.of<number>(1, 2)

      expect(set.intersection()).not.toBe(set)
      expect(set.intersection(HashSet.of(2, 3)).toArray()).toEqual([2])
      expect(set.intersection([1], [2]).toArray()).toEqual([])
    })
  })

  describe('#toArray()', () => {
    test('should convert to an array', () => {
      expect(HashSet.of(1, 2, 3).toArray()).toEqual([1, 2, 3])
    })
  })
})
