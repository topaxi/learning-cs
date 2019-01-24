import { range } from '../../utils/range'

function isEvenlyDivisibleBy(n: number, divisors: number[]): boolean {
  for (let i of divisors) {
    if (n % i !== 0) return false
  }

  return true
}

let divisors = Array.from(range(20), n => n + 1)
let step = divisors.reduce((a, b) => Math.max(a, b))

for (let i of range(step, Infinity, { step })) {
  if (isEvenlyDivisibleBy(i, divisors)) {
    console.log(i)
    break
  }
}
