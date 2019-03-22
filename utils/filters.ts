export const byKey = <T>(key: T) => (o: { key: T }): boolean => o.key === key
export const byValue = <T>(value: T) => (o: { value: T }): boolean =>
  o.value === value
