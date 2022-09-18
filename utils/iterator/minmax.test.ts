import { min, max } from './minmax'

describe('utils/iterator/minmax', () => {
  it('should throw on empty iterable', () => {
    expect(() => min([])).toThrow(
      /Reduce of empty iterable without initial value/
    )
    expect(() => max([])).toThrow(
      /Reduce of empty iterable without initial value/
    )
  })

  describe('min()', () => {
    it('should return minimum value', () => {
      expect(min([2])).toBe(2)
      expect(min([2, 5, 1, 8])).toBe(1)
    })

    it('should return minimum value using project', () => {
      const project = (o: { value: number }) => o.value

      expect(min([{ value: 2 }], project)).toEqual({ value: 2 })
      expect(
        min([{ value: 2 }, { value: 5 }, { value: 1 }, { value: 8 }], project)
      ).toEqual({ value: 1 })
    })
  })

  describe('max()', () => {
    it('should return maximum value', () => {
      expect(max([2])).toBe(2)
      expect(max([2, 5, 1, 8])).toBe(8)
    })

    it('should return maximum value using project', () => {
      const project = (o: { value: number }) => o.value

      expect(max([{ value: 2 }], project)).toEqual({ value: 2 })
      expect(
        max([{ value: 2 }, { value: 5 }, { value: 1 }, { value: 8 }], project)
      ).toEqual({ value: 8 })
    })
  })
})
