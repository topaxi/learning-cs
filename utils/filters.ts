export const byKey = <T>(key: T) => (o: { key: T }): boolean => o.key === key
