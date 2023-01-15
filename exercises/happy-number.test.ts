import { isHappy } from './happy-number'

describe('202. Happy Number', () => {
  it.each([19])('should define %o as a happy number', n => {
    expect(isHappy(n)).toBe(true)
  })

  it.each([2])('should define %o as an unhappy number', n => {
    expect(isHappy(n)).toBe(false)
  })
})
