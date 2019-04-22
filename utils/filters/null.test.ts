import { isNull, notNull, isNullish, notNullish } from './null'

describe('utils/filters/null', () => {
  describe('isNull()', () => {
    test('should filter null values', () => {
      expect([1, null, 1, undefined].filter(isNull)).toEqual([null])
    })
  })

  describe('notNull()', () => {
    test('should filter not null values', () => {
      expect([1, null, 1, undefined].filter(notNull)).toEqual([
        1,
        1,
        undefined
      ])
    })
  })

  describe('isNullish()', () => {
    test('should filter null and undefined values', () => {
      expect([1, null, 1, undefined].filter(isNullish)).toEqual([
        null,
        undefined
      ])
    })
  })

  describe('notNullish()', () => {
    test('should filter not null and undefined values', () => {
      expect([1, null, 1, undefined].filter(notNullish)).toEqual([1, 1])
    })
  })
})
