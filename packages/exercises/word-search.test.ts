import { wordSearch } from './word-search'

describe('79. Word Search', () => {
  test('should return wether the word can be constructed or not', () => {
    let board = [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ]

    expect(wordSearch(board, 'ABCCED')).toBe(true)
    expect(wordSearch(board, 'SEE')).toBe(true)
    expect(wordSearch(board, 'ABCB')).toBe(false)
  })
})
