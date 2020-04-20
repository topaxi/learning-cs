const head = (str: string) => str.charAt(0)
const tail = (str: string) => str.slice(1)

/**
 * Tiny RegExp engine, supporting ^.?*+$
 */
export function match(pattern: string, str: string): boolean {
  if (head(pattern) === '^') return _match(tail(pattern), str)

  return _match(`.*${pattern}`, str)
}

function _match(pattern: string, str: string): boolean {
  if (pattern === '') return true
  if (str === '' && pattern === '$') return true

  switch (pattern.charAt(1)) {
    case '?':
      return matchQuestion(pattern, str)
    case '*':
      return matchStar(pattern, str)
    case '+':
      return matchPlus(pattern, str)
  }

  return matchOne(head(pattern), head(str)) && _match(tail(pattern), tail(str))
}

function matchRest(pattern: string, str: string): boolean {
  return _match(pattern.slice(2), str)
}

function matchOne(pattern: string, str: string): boolean {
  if (str === '') return false
  if (pattern === '') return true

  return pattern === '.' || pattern === str
}

function matchQuestion(pattern: string, str: string): boolean {
  return (
    (matchOne(head(pattern), head(str)) &&
      _match(pattern.slice(2), tail(str))) ||
    matchRest(pattern, str)
  )
}

function matchStar(pattern: string, str: string): boolean {
  return (
    (matchOne(head(pattern), head(str)) && _match(pattern, tail(str))) ||
    matchRest(pattern, str)
  )
}

function matchPlus(pattern: string, str: string): boolean {
  return matchOne(head(pattern), head(str)) && matchStar(pattern, tail(str))
}
