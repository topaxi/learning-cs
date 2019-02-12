import { expect } from 'chai'
import { memoize } from './memo'

describe('memoize', () => {
  it('should return same value for same input', () => {
    let fn = memoize((a: any) => [a])
    let a = { a: 'a' }
    let b = { b: 'b' }

    expect(fn(a)).to.equal(fn(a))
    expect(fn(b)).not.to.equal(fn(a))
  })

  it('should memoize with multiple arguments', () => {
    let fn = memoize((a: any, b: any, c: any) => [a, b, c])
    let a = { a: 'a' }
    let b = { b: 'b' }
    let c = { c: 'c' }

    expect(fn(a, b, c)).to.equal(fn(a, b, c))
    expect(fn(b, c, a)).not.to.equal(fn(a, b, c))
  })
})
