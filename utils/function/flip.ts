export const flip = <T, U, S>(f: (x: T) => (y: U) => S) => (y: U) => (x: T) =>
  f(x)(y)
