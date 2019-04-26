const reverseEven = (p: string, i: number) =>
  i % 2 === 0 ? p.split('').reverse() : p

export function reverseStr(s: string, k: number): string {
  return s
    .match(new RegExp(`.{0,${k}}`, 'g'))!
    .flatMap(reverseEven)
    .join('')
}
