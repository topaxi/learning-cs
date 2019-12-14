import { isEmpty } from './is-empty'

describe('utils/object/is-empty', () => {
  test('should return whether an object has no own properties', () => {
    expect(isEmpty({})).toEqual(true)
    expect(isEmpty(Object.create(null))).toEqual(true)
    expect(isEmpty(Object.create({ foo: 'foo' }))).toEqual(true)
    expect(isEmpty({ foo: 'foo' })).toEqual(false)
  })
})
