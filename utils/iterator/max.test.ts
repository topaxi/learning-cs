import { max } from './max'

describe('utils/iterator/max', () => {
  it('should throw on empty iterable', () => {
    expect(() => max([])).toThrow(
      /Reduce of empty iterable without initial value/
    )
  })

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
