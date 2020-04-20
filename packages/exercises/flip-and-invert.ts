import { range } from '../utils/range'

export function flipAndInvertImage(A: number[][]): number[][] {
  for (let i of range(A.length)) {
    for (let j of range(A[i].length / 2)) {
      swapInvert(A[i], j, A[i].length - j - 1)
    }
  }

  return A
}

function swapInvert(arr: number[], a: number, b: number): void {
  ;[arr[a], arr[b]] = [+!arr[b], +!arr[a]]
}
