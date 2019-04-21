import { pick } from './pick'

describe('utils/pick', () => {
  test('it should pick properties from object', () => {
    let obj = { a: 1, b: 2, c: 3 }

    expect(pick('a')(obj)).toEqual({ a: 1 })
    expect(pick('a', 'c')(obj)).toEqual({ a: 1, c: 3 })
  })
})
