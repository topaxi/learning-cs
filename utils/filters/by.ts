import { prop } from '../object/prop'

export function by<O, P extends keyof O, V extends O[P]>(
  p: P | ((o: O) => V),
  v: V
): (o: O) => boolean {
  if (typeof p === 'function') {
    return o => p(o) === v
  }

  return by(prop(p), v)
}

export const byKey: <T>(key: T) => (o: { key: T }) => boolean = key =>
  by('key', key)
