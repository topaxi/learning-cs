import { reverse } from '../../utils/string/reverse'

const { floor, max } = Math

function splitStringInHalf(str: string): [string, string] {
  let halfLength = floor(str.length / 2)

  return [str.slice(0, halfLength), str.slice(halfLength + (str.length % 2))]
}

function isPalindrome(str: string): boolean {
  const [firstHalf, secondHalf] = splitStringInHalf(str)

  return firstHalf === reverse(secondHalf)
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

export function solve(n: number): number {
  return longestNumericPalindrome(n)
}
