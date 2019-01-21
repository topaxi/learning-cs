export function hightlightHTML(body: string, terms: string[]): string {
  let startPoints: Record<number, number> = {}
  let endPoints: Record<number, number> = {}
  let counter = 0
  let output = ''

  for (let i = 0; i < body.length; i++) {
    for (let term of terms) {
      if (body.slice(i).startsWith(term)) {
        if (startPoints[i] === undefined) {
          startPoints[i] = 0
        }

        if (endPoints[i + term.length - 1] === undefined) {
          endPoints[i + term.length - 1] = 0
        }

        startPoints[i]++
        endPoints[i + term.length - 1]++
      }
    }

    let c = counter
    counter += startPoints[i] || 0
    if (c === 0) {
      if (counter > 0) {
        output += '<b>'
      }
    }

    output += body[i]

    c = counter
    counter -= endPoints[i] || 0
    if (c !== 0) {
      if (counter === 0) {
        output += '</b>'
      }
    }
  }

  return output
}
