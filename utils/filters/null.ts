export const isNull = <T>(value: T | null): value is null => value === null
export const notNull = <T>(value: T | null): value is T => value !== null

export const isNullish = <T>(
  value: T | null | undefined
): value is null | undefined => value == null
export const notNullish = <T>(value: T | null | undefined): value is T =>
  value != null
