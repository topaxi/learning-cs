import { includedIn } from './included-in'

describe('utils/filters/included-in', () => {
  test('should filter values included in given iterable', () => {
    expect([1, 2, 3].filter(includedIn([2, 4]))).toEqual([2])
  })

  test('should filter values based on property', () => {
    expect(
      [{ id: 1 }, { id: 2 }, { id: 3 }].filter(
        includedIn([{ id: 2 }, { id: 4 }], o => o.id)
      )
    ).toEqual([{ id: 2 }])
  })

  test('should filter values based on different property', () => {
    expect(
      [{ id: 1 }, { id: 2 }, { id: 3 }].filter(
        includedIn([{ fid: 2 }, { fid: 4 }], o => o.fid, o => o.id)
      )
    ).toEqual([{ id: 2 }])
  })
})
