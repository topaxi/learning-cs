// eslint-disable-next-line @typescript-eslint/no-empty-function, require-yield
export function* empty(): Generator<never, void> {
  return
}

export const EMPTY: Generator<never, void> = empty()
