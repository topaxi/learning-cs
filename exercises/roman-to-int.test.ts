import { romanToInt } from './roman-to-int'

describe('13. Roman to Integer', () => {
  test.each<[string, number]>([
    ['X', 10],
    ['XIII', 13],
    ['XIV', 14],
    ['XV', 15],
    ['XVI', 16],
    ['LVIII', 58],
    ['MCMXCIV', 1994]
  ])('%s should equal %d', (roman, integer) => {
    expect(romanToInt(roman)).toBe(integer)
  })
})
