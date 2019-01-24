function reverseString(str: string): string {
  return str
    .split('')
    .reverse()
    .join('')
}

function isPalindrome(str: string): boolean {
  let halfLength = Math.floor(str.length / 2)

  return (
    str.slice(0, halfLength) ===
    reverseString(str.slice(halfLength + (str.length % 2)))
  )
}

function longestNumericPalindrome(max: number): number {
  let p = 0
  for (let i = max; i > 0; i--) {
    for (let j = i; j > 0; j--) {
      let v = i * j

      if (isPalindrome(v.toString())) {
        p = Math.max(p, v)
      }
    }
  }
  return p
}

console.log(longestNumericPalindrome(999))
