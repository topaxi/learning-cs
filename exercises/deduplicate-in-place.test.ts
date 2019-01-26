import { expect } from 'chai'
import { deduplicateInPlace } from './deduplicate-in-place'

describe('deduplicateInPlace', () => {
  it('should remove duplicates in array', () => {
    let array = [1, 1, 2, 4, 5, 6, 5, 4, 4]

    deduplicateInPlace(array)

    expect(array).to.deep.equal([1, 2, 4, 5, 6])
  })
})
