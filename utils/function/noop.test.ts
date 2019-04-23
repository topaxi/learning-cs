import { noop } from './noop'

describe('utils/function/noop', () => {
  test('should return undefined', () => {
    expect(noop()).toBeUndefined()
    expect((noop as any)('asdf')).toBeUndefined()
  })
})
