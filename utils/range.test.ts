import { range } from './range'

describe('utils/range', () => {
  test('range iterator', () => {
    expect(Array.from(range(0, 5))).toEqual([0, 1, 2, 3, 4])
  })

  test('inclusive option', () => {
    expect(Array.from(range(0, 3, { inclusive: true }))).toEqual([0, 1, 2, 3])
  })

  test('step option', () => {
    expect(Array.from(range(0, 5, { step: 2 }))).toEqual([0, 2, 4])
    expect(Array.from(range(0, 5, { step: i => i + 2 }))).toEqual([0, 2, 4])
  })
})
