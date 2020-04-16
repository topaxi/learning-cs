import { get } from './get'

describe('utils/object/get', () => {
  test('should return a function getting a property', () => {
    expect(
      get<{ foo: string }>({ foo: 'bar' })('foo')
    ).toBe('bar')
  })
})
