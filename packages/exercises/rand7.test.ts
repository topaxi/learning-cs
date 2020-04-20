import { HashMap } from '../data-structures/hash/hash-map'
import { range } from '../utils/range'
import { rand7, rand7m5 } from './rand7'

describe('rand7', () => {
  test('should return number between 1 and 7', () => {
    let m = new HashMap.withDefault(0)

    range(7000).forEach(() => {
      let r = rand7()

      m.set(r, m.get(r) + 1)
    })

    expect(m.size).toBe(7)

    for (let v of m.values()) {
      expect(v).toBeGreaterThan(900)
      expect(v).toBeLessThan(1100)
    }
  })
})

describe('rand7m5', () => {
  test('should return number between 1 and 7', () => {
    let m = new HashMap.withDefault(0)

    range(7000).forEach(() => {
      let r = rand7m5()

      m.set(r, m.get(r) + 1)
    })

    expect(m.size).toBe(7)

    for (let v of m.values()) {
      expect(v).toBeGreaterThan(900)
      expect(v).toBeLessThan(1100)
    }
  })
})
