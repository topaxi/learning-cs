import { nQueens, ChessFigure, Queen } from './n-queens'
import { range } from '../utils/range'

describe('nQueens', () => {
  test('should place queens without threatening each other', () => {
    for (let i of range(3, 8, { inclusive: true })) {
      expect(
        nQueens(i)
          .map(placeQueens)
          .map(printChessboard)
      ).toMatchSnapshot()
    }
  })
})

type Chessboard = Array<Array<ChessFigure | null>>

function drawBar(board: Chessboard): string {
  return '-'.repeat(board.length * 3 - board.length + 1)
}

function printChessboard(queens: Chessboard): string {
  let board = drawBar(queens) + '\n'

  return queens
    .reduce(
      (board, row) =>
        row.reduce((board, cell) => `${board}${cell || ' '}|`, board + '|') +
        `\n${drawBar(queens)}\n`,
      board
    )
    .trimRight()
}

const returnNull = () => null

function createEmptyBoard(size: number): Chessboard {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, returnNull)
  )
}

function placeQueens(queens: Queen[]): Chessboard {
  let board = createEmptyBoard(queens.length)

  for (let i of range(queens.length)) {
    board[queens[i].row][queens[i].column] = queens[i]
  }

  return board
}
