export function findOcurrences(
  text: string,
  first: string,
  second: string
): string[] {
  let r = new RegExp(String.raw`(?<=${first}\s+${second}\s+)(\w+)`, 'g')
  let m = null
  let s = []

  while ((m = r.exec(text))) {
    s.push(m[1])
  }

  return s
}
