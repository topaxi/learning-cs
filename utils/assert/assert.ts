import { AssertionError } from './AssertionError'

export type AssertMessage = string | Error

/**
 * Asserts that the given condition is true or throws an error otherwise.
 */
export function assert(
  condition: boolean,
  message: AssertMessage
): asserts condition {
  if (condition !== true) {
    if (message instanceof Error) {
      throw new AssertionError(message.message, { cause: message })
    }

    throw new AssertionError(message)
  }
}

/**
 * Asserts that the given value is not null.
 */
export function assertNotNull<T>(
  value: T,
  message: AssertMessage = 'Expected value to not be null'
): asserts value is Exclude<T, null> {
  assert(value !== null, message)
}

/**
 * Asserts that the given value is not undefined.
 */
export function assertNotUndefined<T>(
  value: T,
  message: AssertMessage = 'Expected value to not be undefined'
): asserts value is Exclude<T, undefined> {
  assert(value !== undefined, message)
}

/**
 * Asserts that the given value is neither null nor undefined.
 */
export function assertNotNullish<T>(
  value: T,
  message: AssertMessage = 'Expected value to not be null or undefined'
): asserts value is Exclude<T, null | undefined> {
  assert(value != null, message)
}

/**
 * Asserts that the given value is a string.
 */
export function assertString(
  value: unknown,
  message: AssertMessage = 'Expected value to be a string'
): asserts value is string {
  assert(typeof value === 'string', message)
}

/**
 * Asserts that the given value is a non-empty string.
 */
export function assertNonEmptyString(
  value: unknown,
  message: AssertMessage = 'Expected value to be a non-empty string'
): asserts value is string {
  assert(typeof value === 'string' && value !== '', message)
}

/**
 * Asserts that the given value is a number.
 */
export function assertNumber(
  value: unknown,
  message: AssertMessage = 'Expected value to be a number'
): asserts value is number {
  assert(typeof value === 'number', message)
}

/**
 * Asserts that the given string is a numeric value.
 */
export function assertNumeric(
  value: unknown,
  message: AssertMessage = 'Expected value to be a numeric string'
): asserts value is string {
  assertNonEmptyString(value, message)
  assert(/^\d+$/.test(value), message)
}

/**
 * Asserts that the given value is a finite number.
 */
export function assertFiniteNumber(
  value: unknown,
  message: AssertMessage = 'Expected value to be a finite number'
): asserts value is number {
  assert(Number.isFinite(value), message)
}

/**
 * Asserts that the given value is a date object.
 */
export function assertDate(
  value: unknown,
  message: AssertMessage = 'Expected value to be a Date object'
): asserts value is Date {
  assert(
    typeof value === 'object' &&
      Object.prototype.toString.call(value) === '[object Date]',
    message
  )
}

/**
 * Asserts that the given value is a valid date object.
 */
export function assertValidDate(
  value: unknown,
  message: AssertMessage = 'Expected value to be a valid Date object'
): asserts value is Date {
  assertDate(value, message)
  assertFiniteNumber(Number(value), message)
}

/**
 * Asserts that the function is never called.
 */
export function assertNever(_value: never, message: AssertMessage): never {
  assert(false, message)
}
