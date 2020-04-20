export function pow(x: number, n: number): number {
  if (n === 0) return 1
  if (n === 1) return x
  if (n === -1) return 1 / x
  if (n === 2) return x * x
  if (n % 2 === 0) {
    let y = pow(x, n / 2)
    return y * y
  }

  return x * pow(x, n - 1)
}
