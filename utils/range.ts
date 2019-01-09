export function* range(start: number, end: number): IterableIterator<number> {
  for (let i = start; i < end; i++) yield i
}
