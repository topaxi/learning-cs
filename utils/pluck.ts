export const pluck = <T, P extends keyof T>(key: P) => (t: T) => t && t[key]
