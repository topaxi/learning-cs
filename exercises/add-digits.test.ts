import { addDigits } from './add-digits'

describe('258. Add Digits', () => {
  it.each([
    [38, 2],
    [0, 0],
  ])('addDigits(%o): %o', (num, expected) => {
    expect(addDigits(num)).toBe(expected)
  })
})
