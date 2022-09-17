export interface ComparisonOperator {
  (a: number): (b: number) => boolean
  (a: bigint): (b: bigint) => boolean
}

export const eq =
  <T>(t: T) =>
  <U extends T>(u: U): u is U =>
    t === u

export const gt: ComparisonOperator = a => b => b > a
export const gte: ComparisonOperator = a => b => b >= a
export const lt: ComparisonOperator = a => b => b < a
export const lte: ComparisonOperator = a => b => b <= a
