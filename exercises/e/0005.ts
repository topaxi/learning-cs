import { range } from '../../utils/range'
import { partial } from '../../utils/function/partial'
import { add } from '../../utils/operators'
import { arity2 } from '../../utils/function/arity'

const { max } = Math

function isEvenlyDivisibleBy(n: number, divisors: number[]): boolean {
  for (let i of divisors) {
    if (n % i !== 0) return false
  }

  return true
}

let divisors = Array.from(range(20), partial(add, 1))
let step = divisors.reduce(arity2(max))

for (let i of range(step, Infinity, { step })) {
  if (isEvenlyDivisibleBy(i, divisors)) {
    console.log(i)
    break
  }
}
