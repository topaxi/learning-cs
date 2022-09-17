import { range } from '../../utils/range'
import { sum } from '../../utils/iterator/sum'

export function solve(n: number): number {
  const sumOfSquares = sum(
    range(1, n, { inclusive: true, project: n => n ** 2 })
  )
  const squareOfSum = sum(range(1, n, { inclusive: true })) ** 2

  return squareOfSum - sumOfSquares
}
