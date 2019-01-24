import { range } from '../utils/range'

console.log(
  Array.from(range(1000))
    .filter(n => n % 3 === 0 || n % 5 === 0)
    .reduce((a, b) => a + b)
)
