export function sumWithoutPlus(a: number, b: number): number {
  if (b === 0) return a
  return sumWithoutPlus(a ^ b, (a & b) << 1)
}
