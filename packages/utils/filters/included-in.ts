import { identity } from '../function/identity'
import { pa } from '../function/partial'
import { c } from '../function/compose'
import { map } from '../iterator/map'

export type is<S> = (value: S) => value is S

const setHas = <T>(set: Set<T>, value: any): value is T => set.has(value)

export const includedIn = <T, S = T, U = S>(
  iterable: Iterable<T>,
  project: (value: T) => U = identity as any,
  projectValue: (value: S) => U = project as any
): is<S> =>
  c(pa(setHas, new Set(map(iterable, project))), projectValue) as is<S>
