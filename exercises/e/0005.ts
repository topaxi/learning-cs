import { range } from '../../utils/range'
import { partial } from '../../utils/function/partial'
import { add } from '../../utils/operators'
import { arity2 } from '../../utils/function/arity'
import { consume } from '../../utils/iterator/consume'
import { takeOne } from '../../utils/iterator/take'
import { filter } from '../../utils/iterator/filter'

const { max } = Math

function isEvenlyDivisibleBy(divisors: number[]): (n: number) => boolean {
  return n => divisors.every(i => n % i === 0)
}

export function solve(n: number): number | undefined {
  let divisors = Array.from(range(n), partial(add, 1))
  let step = divisors.reduce(arity2(max))

  return consume(
    takeOne(
      filter(range(step, Infinity, { step }), isEvenlyDivisibleBy(divisors))
    )
  )
}
