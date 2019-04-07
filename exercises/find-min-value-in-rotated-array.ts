export function findMinValueInRotatedArray(array: number[]): number {
  let start = 0
  let end = array.length - 1

  if (array[start] < array[end]) {
    return array[start]
  }

  while (start < end) {
    let i = Math.floor((start + end) / 2)

    if (array[i] >= array[0]) {
      start = i + 1
    } else {
      end = i
    }
  }

  return array[start]
}
