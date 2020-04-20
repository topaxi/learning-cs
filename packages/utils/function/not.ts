export function not<A extends unknown[]>(
  fn: (...args: A) => true
): (...args: A) => false
export function not<A extends unknown[]>(
  fn: (...args: A) => false
): (...args: A) => true
export function not<A extends unknown[]>(
  fn: (...args: A) => boolean
): (...args: A) => boolean
export function not<A extends unknown[]>(
  fn: (...args: A) => boolean
): (...args: A) => boolean {
  return (...args) => !fn(...args)
}
