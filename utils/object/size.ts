import { keys } from './keys'

export function size(obj: object): number {
  let size = 0

  for (let _key of keys(obj)) {
    size++
  }

  return size
}
