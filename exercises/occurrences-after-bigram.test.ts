import { findOcurrences } from './occurrences-after-bigram'

describe('1078. Occurrences After Bigram', () => {
  test('should find all occurrences', () => {
    expect(
      findOcurrences('alice is a good girl she is a good student', 'a', 'good')
    ).toEqual(['girl', 'student'])

    expect(findOcurrences('we will we will rock you', 'we', 'will')).toEqual([
      'we',
      'rock',
    ])
  })
})
