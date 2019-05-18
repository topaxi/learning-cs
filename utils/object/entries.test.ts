import { entries } from './entries'

describe('utils/object/entries', () => {
  test('should return an iterator over all own keys and properties', () => {
    let parent = { foo: 'bar', baz: 'qux' }
    let value = Object.create(parent)

    value.foo = 'buz'

    let expected = [['foo', 'buz']]

    expect(Array.from(entries(value))).toEqual(expected)
  })
})
