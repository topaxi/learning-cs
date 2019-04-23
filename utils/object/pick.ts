import { includedIn } from '../filters'
import { c, arity2, paR, not } from '../function'
import { prop } from './prop'

type ObjectIndex = string | number | symbol
type Entry<T, K extends keyof T = keyof T> = [K, T[K]]
type PickPredicate<T> = (entry: Entry<T>, index: number, obj: T) => boolean
type Omit<T, P extends keyof T> = Pick<T, Exclude<keyof T, P>>
type PickByFn = <T>(predicate: PickPredicate<T>) => (o: T) => Partial<T>
type PickFn = <P extends ObjectIndex>(
  ...keys: P[]
) => <T extends Record<P, unknown>>(o: T) => Pick<T, P>
type OmitFn = <P extends ObjectIndex>(
  ...keys: P[]
) => <T extends Record<ObjectIndex, unknown>>(o: T) => Omit<T, P>

const entries: <T>(o: T) => Entry<T>[] = Object.entries
const fromEntries: <T>(entries: Entry<T>[]) => T =
  // @ts-ignore
  Object.fromEntries ||
  (<T>(entries: Entry<T>[]): T =>
    entries.reduce<Partial<T>>((o, [key, value]) => {
      o[key] = value
      return o
    }, {}) as T)

export const pickBy: PickByFn = predicate => o =>
  fromEntries(entries(o).filter(arity2(paR(predicate, o))))

export const omitBy: PickByFn = c(pickBy, not) as any

const props = <R extends Record<ObjectIndex, unknown>>(
  ...keys: (keyof R)[]
): PickPredicate<R> => c(includedIn(keys), prop<Entry<R>, 0>(0))

export const pick: PickFn = c(pickBy, props) as any
export const omit: OmitFn = c(omitBy, props) as any
