import { flat } from './flat'

export function* concat<T>(...iterators: Iterable<T>[]): IterableIterator<T> {
  yield* flat(iterators)
}
