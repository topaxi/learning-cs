import { memoize } from './memoize'

describe('memoize', () => {
  test('should return same value for same input', () => {
    let fn = memoize((a: any) => [a])
    let a = { a: 'a' }
    let b = { b: 'b' }

    expect(fn(a)).toBe(fn(a))
    expect(fn(b)).not.toBe(fn(a))
  })

  test('should memoize with multiple arguments', () => {
    let fn = memoize((a: any, b: any, c: any) => [a, b, c])
    let a = { a: 'a' }
    let b = { b: 'b' }
    let c = { c: 'c' }

    expect(fn(a, b, c)).toBe(fn(a, b, c))
    expect(fn(b, c, a)).not.toBe(fn(a, b, c))
  })

  describe('.unary', () => {
    test('should memoize unary function', () => {
      let fn = memoize.unary((a: any) => [a])
      let a = 'a'
      let b = 'b'

      expect(fn(a)).toBe(fn(a))
      expect(fn(b)).not.toBe(fn(a))
    })
  })

  describe('.weak', () => {
    test('should memoize unary function', () => {
      let fn = memoize.weak.unary((a: any) => [a])
      let a = { a: 'a' }
      let b = { b: 'b' }

      expect(fn(a)).toBe(fn(a))
      expect(fn(b)).not.toBe(fn(a))
    })
  })
})
