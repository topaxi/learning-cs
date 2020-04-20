export function reverse(str: string): string {
  let r = ''
  for (let i = 0; i < str.length; i++) {
    r = r + str[str.length - i - 1]
  }
  return r
}
