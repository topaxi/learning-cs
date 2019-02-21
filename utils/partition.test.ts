import { partitionInline } from './partition'

describe('partitionInline', () => {
  test('should partition array inline', () => {
    let array = [0, 1, 0, 1, 0, 1, 0, 1]

    partitionInline(array, array.length / 2, n => n === 0)

    expect(array).toEqual([0, 0, 0, 0, 1, 1, 1, 1])
  })
})
