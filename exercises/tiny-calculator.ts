import { Stack } from '../data-structures'

export function tinyCalculator(s: string): number {
  let stack = new Stack<number>()
  let sign = 1
  let value = 0

  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case ' ':
        break
      case '+':
        sign = 1
        break
      case '-':
        sign = -1
        break
      case '(':
        stack.push(sign)
        stack.push(value)
        sign = 1
        value = 0
        break
      case ')':
        {
          let val = stack.pop()
          let sign = stack.pop()
          value = sign * value + val
        }
        break
      default:
        {
          let cur = 0
          while (i < s.length && s[i] >= '0' && s[i] <= '9') {
            cur = cur * 10 + (((s[i++] as unknown) as number) | 0)
          }
          i--
          value += sign * cur
        }
        break
    }
  }

  return value
}
