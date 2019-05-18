export function* zip<T, U>(
  ia: Iterable<T>,
  ib: Iterable<U>
): IterableIterator<[T, U]> {
  for (
    let a = ia[Symbol.iterator](),
      b = ib[Symbol.iterator](),
      ar = a.next(),
      br = b.next();
    !ar.done && !br.done;
    ar = a.next(), br = b.next()
  ) {
    yield [ar.value, br.value]
  }
}
