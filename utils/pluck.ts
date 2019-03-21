export function pluck<T, P extends keyof T>(key: P): (t: T) => T[P] {
  return (t: T) => t[key]
}
