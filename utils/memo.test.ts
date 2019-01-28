import { expect } from 'chai'
import { memoize } from './memo'

describe('memoize', () => {
  it('should return same value for same input', () => {
    let fn = memoize((a: any) => [])
    let a = {}
    let b = {}

    expect(fn(a)).to.equal(fn(a))
    expect(fn(b)).not.to.equal(fn(a))
  })
})
