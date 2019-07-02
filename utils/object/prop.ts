export function prop<P extends string | number | symbol>(
  key: P
): <T extends Record<P, unknown>>(t: T) => T[P]
export function prop<T, P extends keyof T = keyof T>(key: P): (t: T) => T[P]
export function prop<T, P extends keyof T = keyof T>(key: P): (t: T) => T[P] {
  return t => t[key]
}
