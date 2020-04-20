export function construct<T, A>(Klass: {
  new (...args: A[]): T
}): (...args: A[]) => T {
  return (...args) => new Klass(...args)
}
