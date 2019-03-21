export interface RangeOptions<T> {
  step?: number
  inclusive?: boolean
  project?: (i: number, index: number) => T
}

export function* range<T = number>(
  start: number,
  end?: number,
  {
    step = 1,
    inclusive = false,
    project = i => (i as unknown) as T
  }: RangeOptions<T> = {}
): IterableIterator<ReturnType<typeof project>> {
  if (end === undefined) {
    end = start
    start = 0
  }

  if (inclusive) {
    end++
  }

  for (let i = start, index = 0; i < end; i += step) yield project(i, index++)
}
