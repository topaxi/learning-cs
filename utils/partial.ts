export function partial<V0, V1, T>(
  fn: (x0: V0, x1: V1) => T,
  ...args: [V0]
): (x1: V1) => T
export function partial<V0, V1, V2, T>(
  fn: (x0: V0, x1: V1, x2: V2) => T,
  ...args: [V0, V1]
): (x2: V2) => T
export function partial<V0, V1, V2, T>(
  fn: (x0: V0, x1: V1, x2: V2) => T,
  ...args: [V0]
): (x1: V1, x2: V2) => T
export function partial<V0, V1, V2, V3, T>(
  fn: (x0: V0, x1: V1, x2: V2, x3: V3) => T,
  ...args: [V0, V1, V2]
): (x2: V3) => T
export function partial<V0, V1, V2, V3, T>(
  fn: (x0: V0, x1: V1, x2: V2, x3: V3) => T,
  ...args: [V0, V1]
): (x2: V2, x3: V3) => T
export function partial<V0, V1, V2, V3, T>(
  fn: (x0: V0, x1: V1, x2: V2, x3: V3) => T,
  ...args: [V0]
): (x1: V1, x2: V2, x3: V3) => T
export function partial<T>(
  fn: (...a: unknown[]) => T,
  ...args: unknown[]
): (...a: unknown[]) => T
export function partial<T>(
  fn: (...a: unknown[]) => T,
  ...pargs: unknown[]
): (...args: unknown[]) => T {
  return (...args) => fn(...pargs, ...args)
}

export const pa = partial

export function partialRight<V0, V1, T>(
  fn: (x0: V0, x1: V1) => T,
  ...args: [V1]
): (x0: V0) => T
export function partialRight<V0, V1, V2, T>(
  fn: (x0: V0, x1: V1, x2: V2) => T,
  ...args: [V1, V2]
): (x0: V0) => T
export function partialRight<V0, V1, V2, T>(
  fn: (x0: V0, x1: V1, x2: V2) => T,
  ...args: [V2]
): (x0: V0, x1: V1) => T
export function partialRight<V0, V1, V2, V3, T>(
  fn: (x0: V0, x1: V1, x2: V2, x3: V3) => T,
  ...args: [V1, V2, V3]
): (x0: V0) => T
export function partialRight<V0, V1, V2, V3, T>(
  fn: (x0: V0, x1: V1, x2: V2, x3: V3) => T,
  ...args: [V2, V3]
): (x0: V0, x1: V1) => T
export function partialRight<V0, V1, V2, V3, T>(
  fn: (x0: V0, x1: V1, x2: V2, x3: V3) => T,
  ...args: [V3]
): (x0: V0, x1: V1, x2: V2) => T
export function partialRight<T>(
  fn: (...a: unknown[]) => T,
  ...args: unknown[]
): (...a: unknown[]) => T
export function partialRight<T>(
  fn: (...a: unknown[]) => T,
  ...pargs: unknown[]
): (...args: unknown[]) => T {
  return (...args) => fn(...args, ...pargs)
}

export const paR = partialRight
