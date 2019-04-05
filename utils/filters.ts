export const by = <O, P extends keyof O, V extends O[P]>(p: P, v: V) => (
  o: O
): boolean => o[p] === v

export const byKey = <T>(key: T) => (o: { key: T }): boolean => o.key === key

export const gt = (value: number) => (v: number): boolean => v > value

export const notNull = <T>(value: T | null): value is T => value !== null
