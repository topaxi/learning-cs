import { assertNever, assertNonEmptyString } from './assert'
import { reduce } from './iterator/reduce'
import { reverse } from './string/reverse'

export function parseBinary(str: string): number {
  assertNonEmptyString(str, 'Not a binary string')

  return reduce(
    reverse(str),
    (n, digit, exp) => {
      if (digit === '0') return n
      if (digit === '1') return n + 2 ** (exp - 1)

      assertNever(digit as never, 'Not a binary string')
    },
    0
  )
}
