export function* range<T = number>(
  start: number,
  end?: number,
  { step = 1, inclusive = false, project = (i: number): T => i as any } = {}
): IterableIterator<T> {
  if (end === undefined) {
    end = start
    start = 0
  }

  if (inclusive) {
    end++
  }

  for (let i = start; i < end; i += step) yield project(i)
}
