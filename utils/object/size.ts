import { hasOwnProperty } from './has-own-property'

export function size(obj: object): number {
  let size = 0

  for (let key in obj) {
    if (hasOwnProperty(obj, key)) {
      size++
    }
  }

  return size
}
