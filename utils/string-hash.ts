// Java hashCode reimplementation
export function hashCode(str: string): number {
  let hash = 0

  if (str.length === 0) {
    return hash
  }

  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash = hash & hash
  }

  return hash
}
