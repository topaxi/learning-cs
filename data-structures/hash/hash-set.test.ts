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
})
