export function restoreString(s: string, indices: number[]): string {
  return indices
    .reduce<string[]>(
      (a, i, ii) => Object.assign(a, { [i]: s[ii] }),
      Array.from(s)
    )
    .join('')
}
