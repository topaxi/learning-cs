import { hasOwnProperty } from '../utils/object/has-own-property'

const parens = {
  ')': '(',
  '}': '{',
  ']': '[',
}

function isClosingParenthesis(s: string): s is keyof typeof parens {
  return hasOwnProperty(parens, s)
}

export function validParenthesis(s: string): boolean {
  if (s == '') return false

  let p = []

  for (let parentheses of s) {
    if (isClosingParenthesis(parentheses)) {
      if (p.pop() !== parens[parentheses]) {
        return false
      }
    } else {
      p.push(parentheses)
    }
  }

  return p.length === 0
}
