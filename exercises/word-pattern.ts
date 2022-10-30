import { zip } from '../utils/iterator/zip'

export function wordPattern(pattern: string, s: string): boolean {
  const map = new Map()
  const used = new Set()

  const words = s.split(' ')

  if (pattern.length !== words.length) {
    return false
  }

  for (let [p, word] of zip(pattern, words)) {
    if (map.has(p)) {
      if (map.get(p) !== word) return false
    } else if (!used.has(word)) {
      map.set(p, word)
      used.add(word)
    } else {
      return false
    }
  }

  return true
}
