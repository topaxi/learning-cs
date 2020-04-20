import { pick, omit } from './pick'

describe('utils/object/pick', () => {
  describe('pick()', () => {
    test('it should pick properties from object', () => {
      let obj = { a: 1, b: 3, c: 3 }

      expect(pick('a')(obj)).toEqual({ a: 1 })
      expect(pick('a', 'c')(obj)).toEqual({ a: 1, c: 3 })
    })
  })

  describe('omit()', () => {
    test('it should omit properties from object', () => {
      let obj = { a: 1, b: 2, c: 3 }

      expect(omit('a')(obj)).toEqual({ b: 2, c: 3 })
      expect(omit('a', 'c')(obj)).toEqual({ b: 2 })
    })
  })
})
