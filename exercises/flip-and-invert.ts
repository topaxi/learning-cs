export function flipAndInvertImage(A: number[][]): number[][] {
  for (let i = 0; i < A.length; i++) {
    for (let j = 0, l = A[i].length / 2; j < l; j++) {
      swapInvert(A[i], j, A[i].length - j - 1)
    }
  }
  return A
}

function swapInvert(arr: number[], a: number, b: number): void {
  ;[arr[a], arr[b]] = [+!arr[b], +!arr[a]]
}
