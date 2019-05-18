export function size(obj: object): number {
  let size = 0

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      size++
    }
  }

  return size
}
