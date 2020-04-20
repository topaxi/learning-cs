export const eq = <T>(t: T) => <U extends T>(u: U): u is U => t === u
export const gt = (value: number) => (v: number): boolean => v > value
export const gte = (value: number) => (v: number): boolean => v >= value
export const lt = (value: number) => (v: number): boolean => v < value
export const lte = (value: number) => (v: number): boolean => v <= value
