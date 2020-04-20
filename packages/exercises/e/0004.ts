import { reverse } from '../../utils/string/reverse'

const { floor, max } = Math

function isPalindrome(str: string): boolean {
  let halfLength = floor(str.length / 2)

  return (
    str.slice(0, halfLength) ===
    reverse(str.slice(halfLength + (str.length % 2)))
  )
}

function longestNumericPalindrome(i: number): number {
  let p = 0
  for (; i > 0; i--) {
    for (let j = i; j > 0; j--) {
      let v = i * j

      if (isPalindrome(v.toString())) {
        p = max(p, v)
      }
    }
  }
  return p
}

console.log(longestNumericPalindrome(999))
