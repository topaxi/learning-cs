export function maximumSubarraySum(list: ReadonlyArray<number>): number {
  let maximum = list[0]
  let currentMaximum = maximum

  for (let i = 1; i < list.length; i++) {
    currentMaximum = Math.max(list[i], currentMaximum + list[i])

    if (currentMaximum > maximum) {
      maximum = currentMaximum
    }
  }

  return maximum
}
