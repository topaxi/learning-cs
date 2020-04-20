import { maxConsecutiveOnes } from './max-consecutive-ones'

describe('485. Max Consecutive Ones', () => {
  test('finds maximum consecutive ones', () => {
    expect(maxConsecutiveOnes([0, 0, 0, 0, 0, 0])).toBe(0)
    expect(maxConsecutiveOnes([1, 1, 0, 1, 1, 1])).toBe(3)
    expect(maxConsecutiveOnes([1, 1, 0, 1, 0, 1])).toBe(2)
    expect(maxConsecutiveOnes([1, 1, 1, 1, 1, 1])).toBe(6)
  })
})
