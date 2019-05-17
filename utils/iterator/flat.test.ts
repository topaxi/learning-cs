import { flat } from './flat'

describe('utils/iterator/flat', () => {
  test('should flatten iterator', () => {
    let a = [1, 2, [3, 4, [5]]]

    expect(Array.from(flat(a))).toEqual([1, 2, 3, 4, [5]])

    expect(Array.from(flat(a, 0))).toEqual(a)
    expect(Array.from(flat(a, 1))).toEqual([1, 2, 3, 4, [5]])
    expect(Array.from(flat(a, 2))).toEqual([1, 2, 3, 4, 5])
  })
})
