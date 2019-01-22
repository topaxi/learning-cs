import { expect } from 'chai'
import { range } from '../utils/range'
import { rand7 } from './rand7'

describe('rand7', () => {
  it('should return number between 1 and 7', () => {
    let m = new Map()

    for (let i of range(7000)) {
      let r = rand7()

      m.set(r, (m.get(r) || 0) + 1)
    }

    for (let v of m.values()) {
      expect(v).to.be.above(900)
      expect(v).to.be.below(1100)
    }
  })
})
