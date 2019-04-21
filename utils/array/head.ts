export interface Head<T> {
  0: T
}

export function head<T>(list: [T]): T
export function head<T>(list: [T, ...unknown[]]): T
export function head<T>(list: readonly T[]): T | undefined
export function head<T>(list: T[]): T | undefined
export function head<T>(list: string): string | undefined
export function head<T>(list: Head<T>): T
export function head(
  list: readonly unknown[] | Head<unknown> | string
): unknown {
  return list[0]
}
