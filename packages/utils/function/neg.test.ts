import { neg } from './neg'

describe('utils/function/neg', () => {
  test('should negate numeric function', () => {
    let returnNumber = (n: number) => n
    let returnNegativeNumber = neg(returnNumber)

    expect(returnNegativeNumber(1)).toBe(-1)
    expect(returnNegativeNumber(-1)).toBe(1)
    expect(returnNegativeNumber(2)).toBe(-2)
    expect(returnNegativeNumber(-2)).toBe(2)
    expect(returnNegativeNumber(Infinity)).toBe(-Infinity)
  })
})
