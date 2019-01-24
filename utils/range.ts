export function* range<T = number>(
  start: number,
  end?: number,
  { step = 1, project = (i: number): T => i as any } = {}
): IterableIterator<T> {
  if (end === undefined) {
    end = start
    start = 0
  }

  for (let i = start; i < end; i += step) yield project(i)
}
