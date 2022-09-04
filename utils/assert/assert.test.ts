import * as a from './assert'
import { AssertionError } from './AssertionError'

describe('assert', () => {
  it('should throw error on false condition', () => {
    expect(() => a.assert(true, 'Passing condition')).not.toThrow()
    expect(() => a.assert(false, 'Failed condition')).toThrow(AssertionError)
    expect(() => a.assert(false, 'Failed condition')).toThrow(
      /Failed condition/
    )
  })

  const typeAssertions = [
    [a.assertNotNull, [null], [undefined, 0, '', 'a string']],
    [a.assertNotUndefined, [undefined], [null, 0, '', 'a string']],
    [a.assertNotNullish, [null, undefined], [0, '', 'a string']],
    [a.assertString, [null, undefined, 5], ['a string', '', '5']],
    [a.assertNonEmptyString, [null, undefined, 5, ''], ['a string', '5']],
    [a.assertNumber, [null, undefined, ''], [NaN, 0, -1, Infinity, 5]],
    [
      a.assertNumeric,
      [null, undefined, '', NaN, 'NaN', '123abc', -1, 2],
      ['0', '1', '5', '12'],
    ],
    [a.assertFiniteNumber, [null, undefined, '', NaN, Infinity], [0, -1, 5]],
    [
      a.assertDate,
      [null, undefined, 5, '', NaN],
      [new Date('2021-10-20'), new Date('InvalidDate')],
    ],
    [
      a.assertValidDate,
      [null, undefined, 5, '', NaN, new Date('InvalidDate')],
      [new Date('2021-10-20')],
    ],
  ] as const

  for (let [assert, invalid, valid] of typeAssertions) {
    describe(`${assert.name}()`, () => {
      // @ts-expect-error Assertions for type errors outside of type checks
      test.each(invalid)('should throw on %s', value => {
        expect(() => assert(value)).toThrow(AssertionError)
      })

      // @ts-expect-error Assertions for non type errors outside of type checks
      test.each(valid)('should not throw on %s', value => {
        expect(() => assert(value)).not.toThrow()
      })
    })
  }

  describe('assertNever()', () => {
    it('should throw error when called', () => {
      expect(() =>
        a.assertNever({} as never, 'Did not expect to be called')
      ).toThrow(AssertionError)

      expect(() =>
        a.assertNever({} as never, 'Did not expect to be called')
      ).toThrow(/Did not expect to be called/)
    })
  })
})
