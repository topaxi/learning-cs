const A = 65
const ALPHABET_LENGTH = 26

export function convertToTitle(n: number): string {
  let s = ''
  while (n > 0) {
    n--
    s = String.fromCharCode(A + (n % ALPHABET_LENGTH)) + s
    n = (n / ALPHABET_LENGTH) << 0
  }
  return s
}

export function convertToTitleR(n: number): string {
  if (n <= 0) return ''
  n--
  return (
    convertToTitle((n / ALPHABET_LENGTH) << 0) +
    String.fromCharCode(A + (n % ALPHABET_LENGTH))
  )
}
