import { collatzSequenceLength, solve } from './0014'

describe('0014', () => {
  it('should return a length of 10 for 13', () => {
    expect(collatzSequenceLength(13)).toBe(10)
  })

  it('should return expected value', () => {
    expect(solve(1_000_000)).toEqual({ n: 837_799, length: 525 })
  })
})
