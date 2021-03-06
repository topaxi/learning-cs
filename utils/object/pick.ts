import { head } from '../array/head'
import { includedIn } from '../filters/included-in'
import { c } from '../function/compose'
import { arity2 } from '../function/arity'
import { paR } from '../function/partial'
import { not } from '../function/not'
import { filter } from '../iterator/filter'
import { map } from '../iterator/map'
import { zip } from '../iterator/zip'
import { entries, Entry } from './entries'
import { get } from './get'

type ObjectIndex = string | number | symbol
type PickPredicate<T> = (entry: Entry<T>, index: number, obj: T) => boolean
type PickByFn = <T extends object>(
  predicate: PickPredicate<T>
) => (o: T) => Partial<T>
type PickFn = <P extends ObjectIndex>(
  ...keys: P[]
) => <T extends Record<P, unknown>>(o: T) => Pick<T, P>
type OmitFn = <P extends ObjectIndex>(
  ...keys: P[]
) => <T extends Record<ObjectIndex, unknown>>(o: T) => Omit<T, P>

const fromEntries: <T>(entries: Iterable<Entry<T>>) => T = Object.fromEntries

export const pickBy: PickByFn = predicate => o =>
  fromEntries(filter(entries(o), arity2(paR(predicate, o))))
export const omitBy: PickByFn = c(pickBy, not) as any

export const pick: PickFn = (...keys) => obj =>
  fromEntries(zip(keys, map(keys, get(obj))))
export const omit: OmitFn = (...keys) =>
  omitBy(c(includedIn(keys), head)) as any
