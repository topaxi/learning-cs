export function findMinValueInRotatedArray(array: number[]): number {
  let start = 0
  let end = array.length - 1

  while (start <= end) {
    if (start === end) {
      return array[start]
    }

    let i = start + Math.floor((end - start) / 2)

    if (i === 0) {
      return array[i]
    }

    if (array[i - 1] !== undefined && array[i] < array[i - 1]) {
      return array[i]
    }

    if (array[i + 1] !== undefined && array[i] > array[i + 1]) {
      return array[i + 1]
    }

    if (array[start] < array[i]) {
      start = i + 1
    } else {
      end = i - 1
    }
  }

  return array[0]
}
