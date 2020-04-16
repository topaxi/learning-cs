import { singleNonDuplicate } from './single-element-in-sorted-array'

describe('540. Single Element in a Sorted Array', () => {
  test.each<[number[], number]>([
    [[3, 3, 7, 7, 10, 11, 11], 10],
    [[1, 1, 2, 3, 3, 4, 4, 8, 8], 2],
  ])('singleNonDuplicate(%o) is %o', (numbers, expected) => {
    expect(singleNonDuplicate(numbers)).toBe(expected)
  })
})
