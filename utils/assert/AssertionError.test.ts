import { AssertionError } from './AssertionError'

describe('AssertionError', () => {
  it('should support cause option', () => {
    let cause = new Error('cause error')
    let err = new AssertionError('Oops!', { cause })

    expect(err.cause).toBe(cause)
  })
})
