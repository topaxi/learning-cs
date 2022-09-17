import { fibgen } from '../../algorithms/dynamic-programming/fib'
import { lt } from '../../utils/filters/eq'
import { takeWhile } from '../../utils/iterator/take-while'

export function solve(n: bigint): bigint {
  let sum = 0n

  for (let f of takeWhile(fibgen(), lt(n))) {
    if (f % 2n === 0n) {
      sum += f
    }
  }

  return sum
}
