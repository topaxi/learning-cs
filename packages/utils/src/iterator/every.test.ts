import { every } from './every'

describe('utils/iterator/every', () => {
  test('should return true if predicate returns true', () => {
    let a = [1, 2, 3, 4]

    expect(every(a, n => n < 5)).toBe(true)
    expect(every(a, n => n === 4)).toBe(false)
  })

  test('should shortcut execution', () => {
    let a = [1, 2, 3, 4]
    let fn = jest.fn(n => n < 3)

    every(a, fn)

    expect(fn).toHaveBeenCalledTimes(3)
  })
})
