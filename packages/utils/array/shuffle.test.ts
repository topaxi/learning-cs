import { shuffle, shuffleInplace } from './shuffle'

describe('utils/array/shuffle', () => {
  describe('shuffle()', () => {
    test('should return a shuffled array', () => {
      let array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

      expect(shuffle(array)).not.toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
  })

  describe('shuffleInPlace()', () => {
    test('should return a shuffled array', () => {
      let array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

      expect(shuffleInplace(array)).not.toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
      expect(shuffleInplace(array)).toBe(array)
    })
  })
})
