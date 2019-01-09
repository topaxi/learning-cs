import { HashMap } from '../../data-structures'
import { range } from '../../utils/range'

// O(n²)
export function fib_naive(n: number): number {
  if (n <= 2) return 1

  return fib_naive(n - 1) + fib_naive(n - 2)
}

// O(n)
export function fib_memo(n: number, memo = new HashMap<number>()): number {
  if (memo.has(n)) return memo.get(n)!

  return memo.set(
    n,
    n <= 2 ? 1 : fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
  )
}

// O(n)
export function fib_bu(n: number): number {
  let fib = [1, 1]

  for (let k of range(2, n)) {
    fib[k] = fib[k - 1] + fib[k - 2]
  }

  return fib[n - 1]
}

// T: O(n) S: O(1)
export function fib_buo(n: number): number {
  let current = 1
  let previous = 1
  let fib = 0

  while (--n !== 1) {
    fib = current + previous
    previous = current
    current = fib
  }

  return fib
}
