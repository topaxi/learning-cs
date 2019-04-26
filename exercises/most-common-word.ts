import { HashMap, HashMapWithDefault } from '../data-structures/hash/hash-map'

const countWord = (map: HashMapWithDefault<string, number>, word: string) => {
  map.set(word, map.get(word) + 1)
  return map
}

export function mostCommonWord(paragraph: string, banned: string[]): string {
  let words = paragraph.match(/\w+/g)!.map(w => w.toLowerCase())
  let wordCounts = words.reduce(countWord, new HashMap.withDefault(0))
  let bannedSet = new Set(banned)
  let maxCount = 0
  let mostCommon = ''

  for (let [word, count] of wordCounts) {
    if (count > maxCount && !bannedSet.has(word)) {
      maxCount = count
      mostCommon = word
    }
  }

  return mostCommon
}
