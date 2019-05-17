import { MultiHashMap } from './multi-hash-map'

describe('MultiHashMap<K, V>', () => {
  test('should map multiple values to keys', () => {
    let map = new MultiHashMap()

    map.set('test', 'value')

    expect(map.get('test')).toContain('value')

    map.set('test', 'another value')

    expect(map.get('test')).toContain('value')
    expect(map.get('test')).toContain('another value')

    map.set('test2', 'value2')

    expect(map.get('test')).not.toContain('value2')
    expect(map.get('test2')).toContain('value2')
  })

  test('should return empty array for empty key', () => {
    let map = new MultiHashMap()

    expect(map.get('something')).toEqual([])
  })

  test('should manage key hash collisions', () => {
    let map = new MultiHashMap(2)

    map.set('test1', 'foo')
    map.set('test2', 'bar')
    map.set('test3', 'baz')
    map.set('test4', 'qux')

    expect(map.size).toBe(4)
  })

  test('should be able to delete keys', () => {
    let map = new MultiHashMap(2)

    map.set('test1', 'foo')
    map.set('test1', 'foo1')
    map.set('test2', 'bar')
    map.set('test3', 'baz')
    map.set('test4', 'qux')

    expect(map.size).toBe(4)

    map.deleteAll('test1')

    expect(map.size).toBe(3)

    map.deleteAll('test2')
    map.deleteAll('test3')

    map.set('test4', 'buz')
    map.delete('test4', 'qux')

    expect(map.get('test4')).toContain('buz')
    expect(map.size).toBe(1)

    map.delete('test4', 'buz')
    expect(map.size).toBe(0)

    expect(map.has('test3')).toBe(false)
    expect(map.has('test4')).toBe(false)
  })

  test('should be able to check key presence', () => {
    let map = new MultiHashMap()

    expect(map.has('test')).toBe(false)

    map.set('test', 'test')

    expect(map.has('test')).toBe(true)
  })

  test('should be able to list keys', () => {
    let map = new MultiHashMap(2)

    map.set('test1', 'foo')
    map.set('test2', 'bar')
    map.set('test3', 'baz')
    map.set('test4', 'qux')

    expect(Array.from(map.keys())).toEqual(
      expect.arrayContaining(['test1', 'test2', 'test3', 'test4'])
    )
  })

  test('should be able to list values', () => {
    let map = new MultiHashMap(2)

    map.set('test1', 'foo')
    map.set('test2', 'bar')
    map.set('test3', 'baz')
    map.set('test4', 'qux')
    map.set('test4', 'buz')

    expect(Array.from(map.values())).toEqual(
      expect.arrayContaining(['foo', 'bar', 'baz', 'qux', 'buz'])
    )
  })

  test('should be able to list entries', () => {
    let map = new MultiHashMap(2)

    map.set('test1', 'foo')
    map.set('test2', 'bar')
    map.set('test3', 'baz')
    map.set('test4', 'qux')
    map.set('test4', 'buz')

    expect(Array.from(map.entries())).toEqual(
      expect.arrayContaining([
        ['test1', 'foo'],
        ['test2', 'bar'],
        ['test3', 'baz'],
        ['test4', 'qux'],
        ['test4', 'buz']
      ])
    )
  })
})
