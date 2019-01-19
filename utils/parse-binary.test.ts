import { expect } from 'chai'
import { parseBinary } from './parse-binary'

describe('parseBinary', () => {
  it('should parse a binary string to a number', () => {
    expect(parseBinary('100')).to.equal(4)
  })

  it('should throw on non binary strings', () => {
    expect(() => parseBinary('2')).to.throw()
  })
})
