export function shortestDistanceToChar(S: string, C: string): Uint16Array {
  let distances = new Uint16Array(S.length)

  for (let i = 0, Ci = S.indexOf(C), Cl = 0xffff; i < S.length; i++) {
    if (S[i] === C) {
      distances[i] = 0
      Cl = Ci
      Ci = S.indexOf(C, i + 1)
      Ci = Ci === -1 ? 0xffff : Ci
    } else {
      distances[i] = Math.min(Ci - i, Math.abs(Cl - i))
    }
  }

  return distances
}
