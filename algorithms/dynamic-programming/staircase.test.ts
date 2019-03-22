import { staircase_naive, staircase_memo } from './staircase'

describe('staircase', () => {
  test('should count number of ways to walk up staircase', () => {
    expect(staircase_naive(-1)).toBe(0)
    expect(staircase_naive(0)).toBe(0)
    expect(staircase_naive(1)).toBe(1)
    expect(staircase_naive(2)).toBe(2)
    expect(staircase_naive(3)).toBe(3)
    expect(staircase_naive(4)).toBe(5)
    expect(staircase_naive(10)).toBe(89)
  })
})

describe('staircase_memo', () => {
  test('should count number of ways to walk up staircase', () => {
    expect(staircase_memo(-1)).toBe(0)
    expect(staircase_memo(0)).toBe(0)
    expect(staircase_memo(1)).toBe(1)
    expect(staircase_memo(2)).toBe(2)
    expect(staircase_memo(3)).toBe(3)
    expect(staircase_memo(4)).toBe(5)
    expect(staircase_memo(10)).toBe(89)
    expect(staircase_memo(100)).toBe(573147844013817200000)
  })
})
