import { length } from '../utils/iterator/length'

export function longestCommonPrefix(strs: string[]): string {
  if (length(strs) === 0) return ''
  if (length(strs) === 1) return strs[0]

  const shortestString = strs.reduce((str, s) =>
    length(s) > length(str) ? s : str
  )

  for (let i = shortestString.length; i--; ) {
    const prefix = shortestString.slice(0, i + 1)

    if (strs.every(str => str.startsWith(prefix))) {
      return prefix
    }
  }

  return ''
}
