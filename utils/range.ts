export function* range(start: number, end?: number): IterableIterator<number> {
  if (end === undefined) {
    end = start
    start = 0
  }

  for (let i = start; i < end; i++) yield i
}
