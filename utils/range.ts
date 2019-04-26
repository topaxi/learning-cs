import { identity } from './function/identity'
import { forEach } from './iterator'

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
    const { start, end, step, project } = this

    for (let i = start, index = 0; i < end; i += step)
      yield project(i, index++)
  }

  forEach<This = this>(
    fn: (this: This | this, value: T, index: number) => unknown,
    thisArg: This | this = this
  ): void {
    return forEach(this, fn, thisArg)
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
