import { HashMapWithDefault } from '../data-structures'
import { head } from '../utils'

export function topKFrequentWords(words: string[], k: number): string[] {
  return Array.from(words.reduce(countReducer, new HashMapWithDefault(0)))
    .sort(sortWordsByFrequency)
    .map(list => head(list))
    .slice(0, k)
}

function countReducer(
  map: HashMapWithDefault<string, number>,
  word: string
): HashMapWithDefault<string, number> {
  map.set(word, map.get(word) + 1)
  return map
}

function sortWordsByFrequency(
  wordA: [string, number],
  wordB: [string, number]
): number {
  let order = wordB[1] - wordA[1]
  if (order === 0) return wordA[0].localeCompare(wordB[0])
  return order
}
