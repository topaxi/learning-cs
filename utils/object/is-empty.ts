import { hasOwnProperty } from './has-own-property'

export function isEmpty(obj: object): boolean {
  for (let key in obj) {
    if (hasOwnProperty(obj, key)) {
      return false
    }
  }

  return true
}
