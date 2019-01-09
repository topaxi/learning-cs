export const eq = <T>(t: T) => <U extends T>(u: U): u is U => t === u
