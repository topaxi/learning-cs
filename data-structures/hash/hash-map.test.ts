import { HashMap } from './hash-map'

describe('HashMap', () => {
  test('should map keys to values', () => {
    let map = new HashMap()

    map.set('test', 'value')

    expect(map.get('test')).toBe('value')

    map.set('test', 'another value')

    expect(map.get('test')).toBe('another value')

    map.set('test2', 'value2')

    expect(map.get('test')).toBe('another value')
    expect(map.get('test2')).toBe('value2')
  })

  test('should return null for empty key', () => {
    let map = new HashMap()

    expect(map.get('something')).toBeNull()
  })

  test('should manage key hash collisions', () => {
    let map = new HashMap(2)

    map.set('test1', 'foo')
    map.set('test2', 'bar')
    map.set('test3', 'baz')
    map.set('test4', 'qux')

    expect(map.size).toBe(4)
  })

  test('should be able to delete keys', () => {
    let map = new HashMap(2)

    map.set('test1', 'foo')
    map.set('test2', 'bar')
    map.set('test3', 'baz')
    map.set('test4', 'qux')

    expect(map.size).toBe(4)

    map.delete('test1')

    expect(map.size).toBe(3)

    map.delete('test2')
    map.delete('test3')
    map.delete('test4')

    expect(map.size).toBe(0)
    expect(map.has('test2')).toBe(false)
  })

  test('should be able to check key presence', () => {
    let map = new HashMap()

    expect(map.has('test')).toBe(false)

    map.set('test', 'test')

    expect(map.has('test')).toBe(true)
  })

  test('should be able to list keys', () => {
    let map = new HashMap(2)

    map.set('test1', 'foo')
    map.set('test2', 'bar')
    map.set('test3', 'baz')
    map.set('test4', 'qux')

    expect(map.keys()).toEqual(['test1', 'test2', 'test3', 'test4'])
  })

  test('should be able to list values', () => {
    let map = new HashMap(2)

    map.set('test1', 'foo')
    map.set('test2', 'bar')
    map.set('test3', 'baz')
    map.set('test4', 'qux')

    expect(map.values()).toEqual(expect.arrayContaining(['foo', 'bar', 'baz', 'qux']))
  })
})
