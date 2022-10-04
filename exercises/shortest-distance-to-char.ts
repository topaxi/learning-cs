import { length } from '../utils/iterator/length'
import { min } from '../utils/iterator/minmax'

const { abs } = Math
const MAX_UINT16 = 0xffff

export function shortestDistanceToChar(S: string, C: string): Uint16Array {
  let distances = new Uint16Array(length(S))

  for (let i = 0, Ci = S.indexOf(C), Cl = MAX_UINT16; i < length(S); i++) {
    if (S[i] === C) {
      distances[i] = 0
      Cl = Ci
      Ci = S.indexOf(C, i + 1)
      Ci = Ci === -1 ? MAX_UINT16 : Ci
    } else {
      distances[i] = min([Ci - i, abs(Cl - i)])
    }
  }

  return distances
}
