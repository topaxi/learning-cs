export function prop<P extends string | number | symbol>(
  p: P
): <T extends Record<P, unknown>>(t: T) => T[P]
export function prop<T, P extends keyof T = keyof T>(p: P): (t: T) => T[P]
export function prop<T, P extends keyof T = keyof T>(p: P): (t: T) => T[P] {
  return t => t[p]
}
