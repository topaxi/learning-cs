import { reverseArrayInPlace } from './reverse-array-in-place'

describe('reverseArrayInPlace', () => {
  test('should reverse array in place', () => {
    let array = [1, 2, 3, 4, 5]
    let reversed = reverseArrayInPlace(array)

    expect(reversed).toEqual([5, 4, 3, 2, 1])
    expect(reversed).toBe(array)

    expect(reverseArrayInPlace([1, 2, 3, 4])).toEqual([4, 3, 2, 1])
  })
})
