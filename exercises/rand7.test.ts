import { HashMapWithDefault } from '../data-structures'
import { range } from '../utils'
import { rand7, rand7m5 } from './rand7'

describe('rand7', () => {
  test('should return number between 1 and 7', () => {
    let m = new HashMapWithDefault(0)

    for (let _i of range(7000)) {
      let r = rand7()

      m.set(r, m.get(r) + 1)
    }

    expect(m.size).toBe(7)

    for (let v of m.values()) {
      expect(v).toBeGreaterThan(900)
      expect(v).toBeLessThan(1100)
    }
  })
})

describe('rand7m5', () => {
  test('should return number between 1 and 7', () => {
    let m = new HashMapWithDefault(0)

    for (let _i of range(7000)) {
      let r = rand7m5()

      m.set(r, m.get(r) + 1)
    }

    expect(m.size).toBe(7)

    for (let v of m.values()) {
      expect(v).toBeGreaterThan(900)
      expect(v).toBeLessThan(1100)
    }
  })
})
