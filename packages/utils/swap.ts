export function swap<T>(obj: T, a: keyof T, b: keyof T): T {
  ;[obj[a], obj[b]] = [obj[b], obj[a]]
  return obj
}
