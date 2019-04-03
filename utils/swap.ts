export function swap<T, K>(obj: T, a: keyof T, b: keyof T): T {
  ;[obj[a], obj[b]] = [obj[b], obj[a]]
  return obj
}
