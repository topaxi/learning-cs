import { ClearableWeakmap } from './clearable-weakmap'

describe('utils/function/memoize/clearable-weakmap', () => {
  test('should be able to clear map', () => {
    let map = new ClearableWeakmap()
    let obj = {}

    map.set(obj, true)

    expect(map.get(obj)).toBe(true)

    map.clear()

    expect(map.get(obj)).toBeUndefined()
  })
})
