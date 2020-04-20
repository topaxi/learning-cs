import {
  minimumEditDistanceNaive,
  minimumEditDistanceMemo,
} from './minimum-edit-distance'

describe.each([minimumEditDistanceNaive, minimumEditDistanceMemo])(
  'MinimumEditDistance',
  minimumEditDistance => {
    test.each<[string, string, number]>([
      ['horse', 'ros', 3],
      ['intention', 'execution', 5],
      ['minimum', 'distance', 7],
    ])(
      `${minimumEditDistance.name}(%o, %o) is %o`,
      (word1, word2, expectedEditDistance) => {
        expect(minimumEditDistance(word1, word2)).toBe(expectedEditDistance)
      }
    )

    if (minimumEditDistance === minimumEditDistanceMemo) {
      test.each<[string, string, number]>([
        ['Dampfschifffahrt', 'Schornsteinfeger', 13],
        ['Dampfschifffahrtsgesellschaft', 'Schornsteinfegermeister', 24],
      ])(
        `${minimumEditDistance.name}(%o, %o) is %o`,
        (word1, word2, expectedEditDistance) => {
          expect(minimumEditDistance(word1, word2)).toBe(expectedEditDistance)
        }
      )
    }
  }
)
