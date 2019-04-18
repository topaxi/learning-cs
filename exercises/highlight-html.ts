import { range, lastIndex } from '../utils'

export function hightlightHTML(body: string, terms: string[]): string {
  let output = ''
  let openAt = Number.MAX_SAFE_INTEGER
  let closeAt = -1

  for (let i of range(body.length)) {
    for (let term of terms) {
      if (body.startsWith(term, i)) {
        openAt = Math.min(openAt, i)
        closeAt = Math.max(closeAt, i + lastIndex(term))
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
