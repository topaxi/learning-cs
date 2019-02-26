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

  test('should be iterable over all the values', () => {
    let set = new HashSet()

    set.add(1)
    set.add(2)
    set.add(3)

    expect([...set]).toEqual([1, 2, 3])
  })

  describe('#union()', () => {
    test('should create an union of the given iterables', () => {
      let set = new HashSet()

      set.add(1)

      expect(set.union()).not.toBe(set)

      set = set.union(new HashSet().add(2).add(3))

      expect(set.toArray()).toEqual([1, 2, 3])

      set = set.union(new HashSet().add(4), [5], [6, 7])

      expect(set.toArray()).toEqual([1, 2, 3, 4, 5, 6, 7])
    })
  })

  describe('#toArray()', () => {
    test('should convert to an array', () => {
      let set = new HashSet()

      set.add(1)
      set.add(2)
      set.add(3)

      expect(set.toArray()).toEqual([1, 2, 3])
    })
  })
})
