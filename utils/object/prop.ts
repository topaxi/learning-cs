export function prop<T, P extends keyof T = keyof T>(key: P): (t: T) => T[P] {
  return t => t[key]
}
