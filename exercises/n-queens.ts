import { range } from '../utils/range'

export abstract class ChessFigure {
  constructor(readonly row: number, readonly column: number) {}

  get leftDiagonal(): number {
    return this.row - this.column
  }

  get rightDiagonal(): number {
    return this.row + this.column
  }

  abstract threatens(chessFigure: ChessFigure | null): boolean

  threatenedBy(chessFigure: ChessFigure | null): boolean {
    if (chessFigure === null) return false

    return chessFigure.threatens(this)
  }
}

export class Queen extends ChessFigure {
  threatens(chessFigure: ChessFigure | null): boolean {
    if (chessFigure === null) return false

    return (
      this.column === chessFigure.column ||
      this.row === chessFigure.row ||
      this.leftDiagonal === chessFigure.leftDiagonal ||
      this.rightDiagonal === chessFigure.rightDiagonal
    )
  }

  override toString(): string {
    return '♕'
  }
}

function solve(
  solutions: Queen[][],
  prevQueens: Array<Queen | null>,
  queenCount: number,
  row: number
): Queen[][] {
  let queens = Array.from(prevQueens)

  if (row === queenCount) {
    solutions.push(queens as Queen[])

    return solutions
  }

  for (let column of range(queenCount)) {
    let queen = new Queen(row, column)

    if (!queens.some(q => queen.threatenedBy(q))) {
      queens[row] = queen
      solutions = solve(solutions, queens, queenCount, row + 1)
      queens[row] = null
    }
  }

  return solutions
}

export function nQueens(queenCount: number): Queen[][] {
  return solve([], [], queenCount, 0)
}
