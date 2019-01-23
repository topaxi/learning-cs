import { expect } from 'chai'
import { HashMapWithDefault } from '../data-structures/hash/hash-map-with-default'
import { range } from '../utils/range'
import { rand7, rand7m5 } from './rand7'

describe('rand7', () => {
  it('should return number between 1 and 7', () => {
    let m = new HashMapWithDefault(0)

    for (let i of range(7000)) {
      let r = rand7()

      m.set(r, m.get(r) + 1)
    }

    expect(m.size).to.equal(7)

    for (let v of m.values()) {
      expect(v).to.be.above(900)
      expect(v).to.be.below(1100)
    }
  })
})

describe('rand7m5', () => {
  it('should return number between 1 and 7', () => {
    let m = new HashMapWithDefault(0)

    for (let i of range(7000)) {
      let r = rand7m5()

      m.set(r, m.get(r) + 1)
    }

    expect(m.size).to.equal(7)

    for (let v of m.values()) {
      expect(v).to.be.above(900)
      expect(v).to.be.below(1100)
    }
  })
})
