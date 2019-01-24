import { range } from '../utils/range'

function isEvenlyDivisibleBy(n: number, divisors: number[]): boolean {
  for (let i of divisors) {
    if (n % i !== 0) return false
  }

  return true
}

let divisors = Array.from(range(20), n => n + 1)
for (let i of range(Infinity)) {
  if (i === 0) continue

  if (isEvenlyDivisibleBy(i, divisors)) {
    console.log(i)
    break
  }
}
