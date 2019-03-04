export function* range(start: number, end: number) {
  for (let i = start; i <= end; i++) yield i
}

export function* map<T, U>(iterator: Iterable<T>, project: (t: T) => U) {
  for (let value of iterator) yield project(value)
}

export function* reverse(iterator: IterableIterator<any>): any {
  for (let value of iterator) {
    yield* reverse(iterator)
    yield value
  }
}

export function foreach<T>(iterator: Iterable<T>, callback: (t: T) => any) {
  for (let value of iterator) callback(value)
}
