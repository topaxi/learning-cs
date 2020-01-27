export type ListType<T> = T extends ReadonlyArray<infer A> ? A : never
export type Compare<T> = (a: T, b: T) => number

export interface SortFunction {
  <T>(list: Iterable<T>, compare?: Compare<T>): T[]
  sort: SortFunctionDefinition
}
export type SortFunctionDefinition = <T>(list: T[], compare: Compare<T>) => T[]

export function defaultCompare(a: any, b: any): number {
  return a - b
}

export function define(sort: SortFunctionDefinition): SortFunction {
  const s = <T>(list: Iterable<T>, compare = defaultCompare) =>
    sort(Array.from(list), compare)

  return Object.defineProperty(s, 'sort', { value: sort })
}
