export function not<A extends unknown[]>(
  fn: (...args: A) => boolean
): (...args: A) => boolean {
  return (...args) => !fn(...args)
}
