export const by = <O, P extends keyof O, V extends O[P]>(
  p: P | ((o: O) => V),
  v: V
) => (typeof p === 'function' ? (o: O) => p(o) === v : (o: O) => o[p] === v)

export const byKey = <T>(key: T) => (o: { key: T }): boolean => o.key === key
