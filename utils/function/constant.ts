export function constant<T>(value: T): () => T {
  return () => value
}

export const returnTrue = constant(true)
export const returnFalse = constant(false)
