export function constant<T>(value: T): () => T {
  return () => value
}

export const returnTrue = constant(true as const)
export const returnFalse = constant(false as const)
