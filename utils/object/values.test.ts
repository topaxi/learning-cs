import { values } from './values'

describe('utils/object/values', () => {
  test('should return an iterator over all own values', () => {
    let parent = { foo: 'bar', baz: 'qux' }
    let value = Object.create(parent)

    value.foo = 'buz'

    let expected = ['buz']

    expect(Array.from(values(value))).toEqual(expected)
  })
})
