import { range, add } from '../../utils'

const sumOfSquares = Array.from(
  range(1, 100, { inclusive: true }),
  n => n ** 2
).reduce(add)
const squareOfSum =
  Array.from(range(1, 100, { inclusive: true })).reduce(add) ** 2

console.log(squareOfSum - sumOfSquares)
