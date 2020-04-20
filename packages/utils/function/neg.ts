export function neg<A extends unknown[]>(
  fn: (...args: A) => number
): (...args: A) => number {
  return (...args) => fn(...args) * -1
}
