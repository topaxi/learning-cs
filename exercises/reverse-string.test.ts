import { reverseStr } from './reverse-string'

describe('541. Reverse String II', () => {
  describe.each<[string, number, string]>([
    ['abcdefghijklmnopq', 2, 'bacdfeghjiklnmopq'],
    ['abcdefghijklmnopq', 3, 'cbadefihgjklonmpq'],
    ['abcdefghijklmnopq', 4, 'dcbaefghlkjimnopq']
  ])('reverseStr(%o, %o)', (s, k, expected) => {
    test(`should return ${expected}`, () => {
      expect(reverseStr(s, k)).toBe(expected)
    })
  })
})
