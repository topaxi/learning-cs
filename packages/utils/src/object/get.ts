export function get<T extends object>(
  obj: T
): <P extends keyof T>(p: P) => T[P]
export function get<T, P extends keyof T = keyof T>(t: T): (p: P) => T[P]
export function get<T, P extends keyof T = keyof T>(t: T): (p: P) => T[P] {
  return p => t[p]
}
