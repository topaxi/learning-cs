import { includedIn } from './filters'
import { c } from './compose'
import { prop } from './prop'

type ObjectIndex = string | number | symbol
type Entry<T, K extends keyof T = keyof T> = [K, T[K]]
type PickPredicate<T> = (entry: Entry<T>, index: number, obj: T) => boolean

const entries: <T>(o: T) => Entry<T>[] = Object.entries
const fromEntries = <T>(entries: Entry<T>[]): T =>
  entries.reduce<Partial<T>>((o, [key, value]) => {
    o[key] = value
    return o
  }, {}) as T

export const pickBy = <T>(o: T, predicate: PickPredicate<T>): Partial<T> =>
  fromEntries(entries(o).filter((entry, index) => predicate(entry, index, o)))

export function pick<P extends ObjectIndex>(...keys: P[]) {
  return <T extends Record<P, unknown>>(o: T): Pick<T, P> =>
    pickBy(o, c(includedIn<P, keyof T>(keys), prop<Entry<T>, 0>(0))) as any
}
