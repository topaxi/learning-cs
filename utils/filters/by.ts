export const by = <O, P extends keyof O, V extends O[P]>(p: P, v: V) => (
  o: O
): boolean => o[p] === v

export const byKey = <T>(key: T) => (o: { key: T }): boolean => o.key === key