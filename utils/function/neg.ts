export function neg<T extends (...args: any[]) => number>(fn: T): T {
  return ((...args) => fn(...args) * -1) as T
}
