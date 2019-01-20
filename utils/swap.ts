export function swap<T>(list: T[], a: number, b: number): T[] {
  ;[list[a], list[b]] = [list[b], list[a]]
  return list
}
