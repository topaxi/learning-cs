import { length } from '../utils/iterator/length'

export function lengthOfLastWord(s: string): number {
  let str = s.trimEnd()

  return length(str) - 1 - str.lastIndexOf(' ')
}
