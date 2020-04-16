import { keys } from './keys'

describe('utils/object/keys', () => {
  test('should return an iterator over all own keys', () => {
    let parent = { foo: 'bar', baz: 'qux' }
    let value = Object.create(parent)

    value.foo = 'buz'

    let expected = ['foo']

    expect(Array.from(keys(value))).toEqual(expected)
  })
})
