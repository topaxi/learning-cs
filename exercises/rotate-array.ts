export function rotateArray<T>(list: T[], k: number): T[] {
  list.unshift(...list.splice(list.length - k, k))
  return list
}
