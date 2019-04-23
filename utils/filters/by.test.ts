import { by, byKey } from './by'

describe('utils/filters/by', () => {
  describe('by()', () => {
    test('should filter by given property', () => {
      expect(
        [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 1 }].filter(
          by('value', 1)
        )
      ).toEqual([{ value: 1 }, { value: 1 }])
    })
  })

  describe('byKey()', () => {
    test('should filter by key property', () => {
      expect(
        [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 1 }].filter(byKey(1))
      ).toEqual([{ key: 1 }, { key: 1 }])
    })
  })
})
