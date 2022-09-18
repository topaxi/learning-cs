import { sumBigInt } from '../../utils/iterator/sum'

export function solve(numbers: string): string {
  const nums = numbers
    .trim()
    .split('\n')
    .map(n => BigInt(n))

  return String(sumBigInt(nums)).slice(0, 10)
}
