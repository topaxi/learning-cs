import { map } from '../iterator/map'

export function toDigits(number: number): IterableIterator<number> {
  return map(String(number).split(''), Number)
}
