import { not } from '../utils/function/not'
import { isWithinMatrix } from '../utils/matrix'
import { range } from '../utils/range'

export function wordSearch(board: string[][], word: string): boolean {
  let a = Array.from(word)
  for (let i of range(board.length))
    for (let j of range(board[i].length))
      if (hasWord(board, a, 0, i, j)) return true
  return false
}

const boundaryCheckFails = not(isWithinMatrix)

function hasWord(
  board: string[][],
  word: string[],
  i: number,
  row: number,
  column: number
): boolean {
  if (word[i] === '') return true
  if (boundaryCheckFails(board, row, column)) return false
  if (board[row][column] !== word[i]) return false
  if (word.length === i + 1) return true

  let char = board[row][column]
  board[row][column] = undefined as any

  let j = i + 1
  let found =
    hasWord(board, word, j, row - 1, column) ||
    hasWord(board, word, j, row, column + 1) ||
    hasWord(board, word, j, row + 1, column) ||
    hasWord(board, word, j, row, column - 1)

  board[row][column] = char

  return found
}
