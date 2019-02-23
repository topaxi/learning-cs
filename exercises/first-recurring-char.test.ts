import { firstRecurringChar } from './first-recurring-char'

describe('firstRecurringChar', () => {
  test('should return first recurring character', () => {
    expect(firstRecurringChar('abca')).toBe('a')
    expect(firstRecurringChar('abcba')).toBe('b')
  })
})
