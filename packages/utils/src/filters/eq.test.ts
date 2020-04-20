import { eq, gt, gte, lt, lte } from './eq'

describe('utils/filters/eq', () => {
  describe('eq()', () => {
    test('should return equality function', () => {
      expect(eq(0)(0)).toBe(true)
      expect(eq(0)(1)).toBe(false)
      expect(eq(0)('0' as any)).toBe(false)
    })
  })

  describe('gt()', () => {
    test('should return greater than function', () => {
      expect(gt(0)(0)).toBe(false)
      expect(gt(0)(1)).toBe(true)
      expect(gt(1)(2)).toBe(true)
      expect(gt(1)(0)).toBe(false)
      expect(gt(2)(1)).toBe(false)
    })
  })

  describe('gte()', () => {
    test('should return greater than or equal function', () => {
      expect(gte(0)(0)).toBe(true)
      expect(gte(0)(1)).toBe(true)
      expect(gte(1)(2)).toBe(true)
      expect(gte(1)(0)).toBe(false)
      expect(gte(2)(1)).toBe(false)
    })
  })

  describe('lt()', () => {
    test('should return lower than function', () => {
      expect(lt(0)(0)).toBe(false)
      expect(lt(0)(1)).toBe(false)
      expect(lt(1)(2)).toBe(false)
      expect(lt(1)(0)).toBe(true)
      expect(lt(2)(1)).toBe(true)
    })
  })

  describe('lte()', () => {
    test('should return lower than or equal function', () => {
      expect(lte(0)(0)).toBe(true)
      expect(lte(0)(1)).toBe(false)
      expect(lte(1)(2)).toBe(false)
      expect(lte(1)(0)).toBe(true)
      expect(lte(2)(1)).toBe(true)
    })
  })
})
