// Without sort
export function isAnagram(str1: string, str2: string): boolean {
  if (str1 === str2) return true

  let map = new Map()

  for (let char of str1) {
    map.set(char, (map.get(char) || 0) + 1)
  }

  for (let char of str2) {
    map.set(char, (map.get(char) || 0) - 1)
  }

  return (
    Array.from(map.values())
      .filter(count => count > 0)
      .reduce((s, v) => s + v, 0) === 0
  )
}
