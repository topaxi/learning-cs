import { join } from './join'

describe('utils/string/join', () => {
  test('should join strings using given delimiter', () => {
    expect(join(',')).toBe('')
    expect(join(',', 'a')).toBe('a')
    expect(join(',', 'a', 'b')).toBe('a,b')
    expect(join(',', 'a', 'b', 'c')).toBe('a,b,c')
  })
})
