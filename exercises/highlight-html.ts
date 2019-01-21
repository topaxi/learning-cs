export function hightlightHTML(body: string, terms: string[]): string {
  let startPoints: Record<number, number> = {}
  let endPoints: Record<number, number> = {}
  let counter = 0
  let output = ''

  for (let i = 0; i < body.length; i++) {
    for (let term of terms) {
      if (body.startsWith(term, i)) {
        if (startPoints[i] === undefined) {
          startPoints[i] = 0
        }

        let endIndex = i + term.length - 1
        if (endPoints[endIndex] === undefined) {
          endPoints[endIndex] = 0
        }

        startPoints[i]++
        endPoints[endIndex]++
      }
    }

    let c = counter
    counter += startPoints[i] || 0
    if (c === 0 && counter !== 0) {
      output += '<b>'
    }

    output += body[i]

    c = counter
    counter -= endPoints[i] || 0
    if (c !== 0 && counter === 0) {
      output += '</b>'
    }
  }

  return output
}
