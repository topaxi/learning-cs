export function validPalindrome(s: string): boolean {
  let str = s.replace(/[^\w]/g, '').toLowerCase()

  for (let i = 0, l = str.length / 2; i < l; i++) {
    if (str[i] !== str[str.length - i - 1]) return false
  }

  return true
}
