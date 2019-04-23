import { identity } from './identity'

describe('utils/function/identity', () => {
  test('should return given value', () => {
    let value = Symbol()

    expect(identity(value)).toBe(value)
  })
})
