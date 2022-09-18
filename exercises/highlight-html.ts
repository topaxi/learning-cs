import { lastIndex } from '../utils/array/last-index'
import { min, max } from '../utils/iterator/minmax'
import { range } from '../utils/range'

export function hightlightHTML(body: string, terms: string[]): string {
  let output = ''
  let openAt = Number.MAX_SAFE_INTEGER
  let closeAt = -1

  for (let i of range(body.length)) {
    for (let term of terms) {
      if (body.startsWith(term, i)) {
        openAt = min([openAt, i])
        closeAt = max([closeAt, i + lastIndex(term)])
      }
    }

    if (openAt === i) {
      output += '<b>'
    }

    output += body[i]

    if (closeAt === i) {
      output += '</b>'
      openAt = Number.MAX_SAFE_INTEGER
    }
  }

  return output
}
