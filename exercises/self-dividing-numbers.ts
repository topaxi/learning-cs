import { range, iter } from '../utils'

export function selfDividingNumbers(left: number, right: number) {
  return Array.from(
    iter.filter(range(left, right, { inclusive: true }), isSelfDividing)
  )
}

function isSelfDividing(n: number): boolean {
  let s = String(n)

  for (let i of range(s.length)) {
    if (s[i] === '0') return false
    if (n % Number(s[i]) !== 0) return false
  }

  return true
}
