function firstRecurringChar(str: string): string | null {
  let seen = new Set<string>()

  for (let char of str) {
    if (seen.has(char)) return char
    seen.add(char)
  }

  return null
}

console.log(firstRecurringChar('abca'))
console.log(firstRecurringChar('abcba'))
