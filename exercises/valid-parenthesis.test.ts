import { validParenthesis } from './valid-parenthesis'

describe('20. Valid Parentheses', () => {
  test.each<[string, boolean]>([
    ['()', true],
    ['([]{})', true],
    ['([]({}))', true],
    ['(', false],
    ['([]{)', false],
  ])('validParenthesis(%o) is %o', (value, expected) => {
    expect(validParenthesis(value)).toBe(expected)
  })
})
