import { identity } from './identity'
import { pa } from './partial'
import * as iter from './iterator'
import { c } from './compose'

export const by = <O, P extends keyof O, V extends O[P]>(p: P, v: V) => (
  o: O
): boolean => o[p] === v

export const byKey = <T>(key: T) => (o: { key: T }): boolean => o.key === key

export const gt = (value: number) => (v: number): boolean => v > value

export const notNull = <T>(value: T | null): value is T => value !== null

const setHas = <T>(set: Set<T>, value: any): value is T => set.has(value)

type is<S> = (value: S) => value is S

export const includedIn = <T, S extends U, U extends T = S>(
  iterable: Iterable<T>,
  project: (value: T) => U = identity.any,
  projectValue: (value: S) => U = project
): is<S> =>
  c(pa(setHas, new Set(iter.map(iterable, project))), projectValue) as is<S>
