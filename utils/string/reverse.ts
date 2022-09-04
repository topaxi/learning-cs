import { reduce } from '../iterator/reduce'

export function reverse(str: string): string {
  return reduce(str, (r, _char, i) => r + str[str.length - i], '')
}
