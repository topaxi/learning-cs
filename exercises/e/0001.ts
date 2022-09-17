import { range } from '../../utils/range'
import { filter } from '../../utils/iterator/filter'
import { sum } from '../../utils/iterator/sum'

export function solve(n: number) {
  return sum(filter(range(n), n => n % 3 === 0 || n % 5 === 0))
}
