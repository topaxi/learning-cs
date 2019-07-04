export function flip<T, U, S>(
  f: (x: T) => (y: U) => S
): (y: U) => (x: T) => S {
  return y => x => f(x)(y)
}
