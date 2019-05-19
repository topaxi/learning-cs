import { HashMap, HashMapWithDefault } from '../data-structures/hash/hash-map'
import { head } from '../utils/array/head'
import { take } from '../utils/iterator/take'

export function topKFrequentWords(words: string[], k: number): string[] {
  return Array.from<[string, number], string>(
    take(
      Array.from(words.reduce(countReducer, new HashMap.withDefault(0))).sort(
        sortWordsByFrequency
      ),
      k
    ),
    head
  )
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
  return order === 0 ? wordA[0].localeCompare(wordB[0]) : order
}
