import { range } from '../utils/range'

const sum = (a: number, b: number) => a + b
const sumOfSquares = Array.from(
  range(1, 100, { inclusive: true }),
  n => n ** 2
).reduce(sum)
const squareOfSum =
  Array.from(range(1, 100, { inclusive: true })).reduce(sum) ** 2

console.log(squareOfSum - sumOfSquares)
