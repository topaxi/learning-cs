export type ListType<T> = T extends ReadonlyArray<infer A> ? A : never
export type Compare<T> = (a: T, b: T) => number

export type SortFunction = <T>(list: Iterable<T>, compare?: Compare<T>) => T[]
export type SortFunctionDefinition = <T>(list: T[], compare: Compare<T>) => T[]

export function defaultCompare(a: any, b: any): number {
  return a - b
}

export function define(searchFn: SortFunctionDefinition): SortFunction {
  return (list, compare = defaultCompare) =>
    searchFn(Array.from(list), compare)
}
