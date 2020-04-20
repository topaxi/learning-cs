import { prop } from './prop'

describe('utils/object/prop', () => {
  test('should return a function getting a property', () => {
    expect(prop<{ foo: string }>('foo')({ foo: 'bar' })).toBe('bar')
  })
})
