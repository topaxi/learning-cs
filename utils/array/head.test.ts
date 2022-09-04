import { head } from './head'

describe('utils/array/head', () => {
  describe('head()', () => {
    test('should return head of array', () => {
      expect(head([])).toBeUndefined()
      expect(head([1])).toBe(1)
      expect(head([1, 2])).toBe(1)

      expect(head('')).toBe('')
      expect(head('s')).toBe('s')
      expect(head('str')).toBe('s')

      expect(head({ 0: 'head' })).toBe('head')
    })
  })
})
