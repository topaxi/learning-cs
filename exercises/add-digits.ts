import { sum } from '../utils/iterator/sum'
import { toDigits } from '../utils/number/to-digits'

export function addDigits(num: number): number {
  if (num < 10) return num

  return addDigits(sum(toDigits(num)))
}
