import { removeElement } from './remove-element'

describe('27. Remove Element', () => {
  it.each([
    [[3, 2, 2, 3], 3, [2, 2]],
    [[0, 1, 2, 2, 3, 0, 4, 2], 2, [0, 1, 3, 0, 4]],
  ])('given %s should remove %d in place', (nums, val, expected) => {
    removeElement(nums, val)

    expect(nums).toEqual(expected)
  })
})
