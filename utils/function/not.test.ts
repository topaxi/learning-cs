import { not } from './not'

describe('utils/function/not', () => {
  test('should invert boolean function', () => {
    let returnTrue = (): true => true
    let returnFalse = not(returnTrue)

    expect(returnFalse()).toBe(false)
  })
})
