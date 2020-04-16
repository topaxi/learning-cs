const matchRomanLiterals = /IV|IX|XL|XC|CD|CM|I|V|X|L|C|D|M/g

const romanLiteralMap = {
  I: 1,
  IV: 4,
  V: 5,
  IX: 9,
  X: 10,
  XL: 40,
  L: 50,
  XC: 90,
  C: 100,
  CD: 400,
  D: 500,
  CM: 900,
  M: 1000,
}

export function romanToInt(romanString: string): number {
  return romanString.match(matchRomanLiterals)!.reduce(romanSum as any, 0)
}

function romanSum(sum: number, match: keyof typeof romanLiteralMap): number {
  return sum + romanLiteralMap[match]
}
