const A = 65
const ALPHABET_LENGTH = 26

function letter(n: number): string {
  return String.fromCharCode(A + (--n % ALPHABET_LENGTH))
}

function next(n: number): number {
  return (--n / ALPHABET_LENGTH) << 0
}

export function convertToTitle(n: number): string {
  let s = ''
  while (n > 0) {
    s = letter(n) + s
    n = next(n)
  }
  return s
}

export function convertToTitleR(n: number): string {
  if (n <= 0) return ''
  return convertToTitleR(next(n)) + letter(n)
}
