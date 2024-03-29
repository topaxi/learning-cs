import { HashMap } from '../../data-structures/hash/hash-map'
import { range } from '../../utils/range'

// O(n²)
export function fibNaive(n: number): number {
  if (n <= 2) return 1

  return fibNaive(n - 1) + fibNaive(n - 2)
}

// T: O(n) S: O(n)
export function fibMemo(
  n: number,
  memo = new HashMap<number, number>()
): number {
  if (memo.has(n)) return memo.get(n)!

  return memo.set(n, n <= 2 ? 1 : fibMemo(n - 1, memo) + fibMemo(n - 2, memo))
}

// T: O(n) S: O(n)
export function fibbu(n: number): number {
  let fib = [1, 1]

  for (let k of range(2, n)) {
    fib[k] = fib[k - 1] + fib[k - 2]
  }

  return fib[n - 1]
}

// T: O(n) S: O(1)
export function fibbuo(n: number): number {
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

export function* fibgen(): Generator<bigint> {
  let current = 1n
  let previous = 1n
  let fib = 0n

  for (;;) {
    fib = current + previous
    yield fib
    previous = current
    current = fib
  }
}
