import { flip } from './flip'

describe('utils/function/flip', () => {
  test('should flip arguments', () => {
    expect(flip((a: string) => (b: string) => a + b)('b')('a')).toBe('ab')
  })
})
