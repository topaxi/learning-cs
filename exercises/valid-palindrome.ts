import { range } from '../utils/range'

export function validPalindrome(s: string): boolean {
  let str = s.replace(/[^\w]/g, '').toLowerCase()

  for (let i of range(str.length / 2)) {
    if (str[i] !== str[str.length - i - 1]) return false
  }

  return true
}
