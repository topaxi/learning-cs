export function not<T extends (...args: any[]) => boolean>(fn: T): T {
  return ((...args) => !fn(...args)) as T
}
