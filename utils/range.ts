import { identity } from './function/identity'

export interface RangeOptions<T> {
  step: number
  inclusive: boolean
  project: (i: number, index: number) => T
}

class Range<T = number> implements Iterable<T> {
  constructor(
    private readonly start: number,
    private readonly end: number,
    private readonly step: number,
    private readonly project: RangeOptions<T>['project']
  ) {}

  *[Symbol.iterator](): IterableIterator<T> {
    const { project } = this

    for (let i = this.start, index = 0; i < this.end; i += this.step)
      yield project(i, index++)
  }

  forEach<This = undefined>(
    fn: (this: This, value: T, index: number) => unknown,
    thisArg?: This
  ): void {
    let i = 0
    for (let value of this) fn.call(thisArg!, value, i++)
  }
}

export function range<T = number>(
  start: number,
  end?: number,
  {
    step = 1,
    inclusive = false,
    project = identity as RangeOptions<T>['project']
  }: Partial<RangeOptions<T>> = {}
): Range<T> {
  if (end === undefined) {
    end = start
    start = 0
  }

  if (inclusive) {
    end++
  }

  return new Range(start, end, step, project)
}
