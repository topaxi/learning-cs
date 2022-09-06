export function consume(iterator: Iterable<unknown>): void {
  let i = iterator[Symbol.iterator]()
  let ir: IteratorResult<unknown>

  do {
    ir = i.next()
  } while (!ir.done)
}
