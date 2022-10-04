import { Y, mY } from '../../utils/function/y'
import { length } from '../../utils/iterator/length'
import { min } from '../../utils/iterator/minmax'

const minDistanceR =
  (
    minDistanceR: (
      word1: string,
      word2: string,
      i: number,
      j: number
    ) => number
  ): typeof minDistanceR =>
  (word1, word2, i, j) => {
    if (i === 0) return j
    if (j === 0) return i

    if (word1[i - 1] === word2[j - 1])
      return minDistanceR(word1, word2, i - 1, j - 1)

    return (
      1 +
      min([
        minDistanceR(word1, word2, i - 1, j - 1),
        minDistanceR(word1, word2, i - 1, j),
        minDistanceR(word1, word2, i, j - 1),
      ])
    )
  }

export function minimumEditDistanceNaive(word1: string, word2: string) {
  return Y(minDistanceR)(word1, word2, length(word1), length(word2))
}

export function minimumEditDistanceMemo(word1: string, word2: string) {
  return mY(minDistanceR)(word1, word2, length(word1), length(word2))
}
