import { some } from './some'

describe('utils/iterator/some', () => {
  test('should return true if predicate returns true', () => {
    let a = [1, 2, 3, 4]

    expect(some(a, n => n === 4)).toBe(true)
    expect(some(a, n => n === 5)).toBe(false)
  })

  test('should shortcut execution', () => {
    let a = [1, 2, 3, 4]
    let fn = jest.fn(n => n === 3)

    some(a, fn)

    expect(fn).toHaveBeenCalledTimes(3)
  })
})
