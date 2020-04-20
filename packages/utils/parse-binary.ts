export function parseBinary(str: string): number {
  let n = 0
  let exp = 0

  for (let i = str.length; i--; exp++) {
    if (str[i] === '0') continue

    if (str[i] === '1') {
      n += 2 ** exp
      continue
    }

    throw new TypeError('Not a binary string')
  }

  return n
}
