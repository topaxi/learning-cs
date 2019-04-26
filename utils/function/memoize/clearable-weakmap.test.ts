import { ClearableWeakmap } from './clearable-weakmap'

describe('utils/function/memoize/clearable-weakmap', () => {
  test('should be able to clear map', () => {
    let map = new ClearableWeakmap()
    let obj = {}

    map.set(obj, true)

    expect(map.has(obj)).toBe(true)
    expect(map.get(obj)).toBe(true)

    map.clear()

    expect(map.has(obj)).toBe(false)
    expect(map.get(obj)).toBeUndefined()
  })

  test('should be able to delete values', () => {
    let map = new ClearableWeakmap()
    let obj = {}

    map.set(obj, true)

    expect(map.has(obj)).toBe(true)
    expect(map.get(obj)).toBe(true)

    map.delete(obj)

    expect(map.has(obj)).toBe(false)
    expect(map.get(obj)).toBeUndefined()
  })

  describe('[Symbol.toStringTag]()', () => {
    test('should return constructor name', () => {
      let map = new ClearableWeakmap()

      expect(String(map)).toBe('[object ClearableWeakmap]')
    })
  })
})
