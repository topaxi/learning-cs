import { Y } from './y'

describe('Y', () => {
  test('should take a fixpoint function', () => {
    let fac = Y(fac => n => (n === 0 ? 1 : n * fac(n - 1)))

    expect(fac(5)).toBe(120)
  })
})
