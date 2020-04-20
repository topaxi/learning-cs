import { find } from './find'

describe('utils/iterator/find', () => {
  describe('find()', () => {
    test('should return the found value', () => {
      let a = [1, 2, 3, 4, 5, 6]

      expect(find(a, v => v === 4)).toBe(4)
    })
  })
})
