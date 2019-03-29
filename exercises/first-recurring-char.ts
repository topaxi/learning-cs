import { HashSet } from '../data-structures'

export function firstRecurringChar(str: string): string | null {
  let seen = new HashSet<string>()

  for (let char of str) {
    if (seen.has(char)) return char
    seen.add(char)
  }

  return null
}
