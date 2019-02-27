export abstract class ChessFigure {
  constructor(readonly row: number, readonly column: number) {}

  get leftDiagonal(): number {
    return this.row - this.column
  }

  get rightDiagonal(): number {
    return this.row + this.column
  }

  abstract threatens(chessFigure: ChessFigure): boolean
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

  toString() {
    return '♕'
  }
}

function solve(
  solutions: Queen[][],
  prevQueens: Array<Queen | null>,
  queenCount: number,
  row: number
) {
  let queens = Array.from(prevQueens)

  if (row === queenCount) {
    solutions.push(queens as Queen[])

    return solutions
  }

  for (let column = 0; column < queenCount; column++) {
    let queen = new Queen(row, column)

    if (!queens.some(q => queen.threatens(q))) {
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
