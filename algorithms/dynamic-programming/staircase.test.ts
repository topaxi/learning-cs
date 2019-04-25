import { staircaseNaive, staircaseMemo } from './staircase'

describe('staircase', () => {
  test('should count number of ways to walk up staircase', () => {
    expect(staircaseNaive(-1)).toBe(0)
    expect(staircaseNaive(0)).toBe(0)
    expect(staircaseNaive(1)).toBe(1)
    expect(staircaseNaive(2)).toBe(2)
    expect(staircaseNaive(3)).toBe(3)
    expect(staircaseNaive(4)).toBe(5)
    expect(staircaseNaive(10)).toBe(89)
    expect(staircaseNaive(20)).toBe(10946)
  })
})

describe('staircase_memo', () => {
  test('should count number of ways to walk up staircase', () => {
    expect(staircaseMemo(-1)).toBe(0)
    expect(staircaseMemo(0)).toBe(0)
    expect(staircaseMemo(1)).toBe(1)
    expect(staircaseMemo(2)).toBe(2)
    expect(staircaseMemo(3)).toBe(3)
    expect(staircaseMemo(4)).toBe(5)
    expect(staircaseMemo(10)).toBe(89)
    expect(staircaseMemo(20)).toBe(10946)
    expect(staircaseMemo(100)).toBe(573147844013817200000)
  })
})
