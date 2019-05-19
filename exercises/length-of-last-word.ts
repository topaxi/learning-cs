export function lengthOfLastWord(s: string): number {
  let str = s.trimRight()
  return str.slice(str.lastIndexOf(' ') + 1).length
}
