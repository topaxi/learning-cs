/**
 * AssertionError that is being thrown by assert functions.
 */
export class AssertionError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)

    this.name = 'AssertError'
  }
}
