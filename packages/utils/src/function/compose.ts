import { identity } from './identity'

// eslint-disable @typescript-eslint/no-explicit-any

export type Many<T> = T | readonly T[]

// 0-argument first function
export function compose<R2, R1>(f2: (a: R1) => R2, f1: () => R1): () => R2
export function compose<R3, R2, R1>(
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: () => R1
): () => R3
export function compose<R4, R3, R2, R1>(
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: () => R1
): () => R4
export function compose<R5, R4, R3, R2, R1>(
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: () => R1
): () => R5
export function compose<R6, R5, R4, R3, R2, R1>(
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: () => R1
): () => R6
export function compose<R7, R6, R5, R4, R3, R2, R1>(
  f7: (a: R6) => R7,
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: () => R1
): () => R7
// 1-argument first function
export function compose<A1, R2, R1>(
  f2: (a: R1) => R2,
  f1: (a1: A1) => R1
): (a1: A1) => R2
export function compose<A1, R3, R2, R1>(
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1) => R1
): (a1: A1) => R3
export function compose<A1, R4, R3, R2, R1>(
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1) => R1
): (a1: A1) => R4
export function compose<A1, R5, R4, R3, R2, R1>(
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1) => R1
): (a1: A1) => R5
export function compose<A1, R6, R5, R4, R3, R2, R1>(
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1) => R1
): (a1: A1) => R6
export function compose<A1, R7, R6, R5, R4, R3, R2, R1>(
  f7: (a: R6) => R7,
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1) => R1
): (a1: A1) => R7
// 2-argument first function
export function compose<A1, A2, R2, R1>(
  f2: (a: R1) => R2,
  f1: (a1: A1, a2: A2) => R1
): (a1: A1, a2: A2) => R2
export function compose<A1, A2, R3, R2, R1>(
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1, a2: A2) => R1
): (a1: A1, a2: A2) => R3
export function compose<A1, A2, R4, R3, R2, R1>(
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1, a2: A2) => R1
): (a1: A1, a2: A2) => R4
export function compose<A1, A2, R5, R4, R3, R2, R1>(
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1, a2: A2) => R1
): (a1: A1, a2: A2) => R5
export function compose<A1, A2, R6, R5, R4, R3, R2, R1>(
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1, a2: A2) => R1
): (a1: A1, a2: A2) => R6
export function compose<A1, A2, R7, R6, R5, R4, R3, R2, R1>(
  f7: (a: R6) => R7,
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1, a2: A2) => R1
): (a1: A1, a2: A2) => R7
// 3-argument first function
export function compose<A1, A2, A3, R2, R1>(
  f2: (a: R1) => R2,
  f1: (a1: A1, a2: A2, a3: A3) => R1
): (a1: A1, a2: A2, a3: A3) => R2
export function compose<A1, A2, A3, R3, R2, R1>(
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1, a2: A2, a3: A3) => R1
): (a1: A1, a2: A2, a3: A3) => R3
export function compose<A1, A2, A3, R4, R3, R2, R1>(
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1, a2: A2, a3: A3) => R1
): (a1: A1, a2: A2, a3: A3) => R4
export function compose<A1, A2, A3, R5, R4, R3, R2, R1>(
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1, a2: A2, a3: A3) => R1
): (a1: A1, a2: A2, a3: A3) => R5
export function compose<A1, A2, A3, R6, R5, R4, R3, R2, R1>(
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1, a2: A2, a3: A3) => R1
): (a1: A1, a2: A2, a3: A3) => R6
export function compose<A1, A2, A3, R7, R6, R5, R4, R3, R2, R1>(
  f7: (a: R6) => R7,
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1, a2: A2, a3: A3) => R1
): (a1: A1, a2: A2, a3: A3) => R7
// 4-argument first function
export function compose<A1, A2, A3, A4, R2, R1>(
  f2: (a: R1) => R2,
  f1: (a1: A1, a2: A2, a3: A3, a4: A4) => R1
): (a1: A1, a2: A2, a3: A3, a4: A4) => R2
export function compose<A1, A2, A3, A4, R3, R2, R1>(
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1, a2: A2, a3: A3, a4: A4) => R1
): (a1: A1, a2: A2, a3: A3, a4: A4) => R3
export function compose<A1, A2, A3, A4, R4, R3, R2, R1>(
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1, a2: A2, a3: A3, a4: A4) => R1
): (a1: A1, a2: A2, a3: A3, a4: A4) => R4
export function compose<A1, A2, A3, A4, R5, R4, R3, R2, R1>(
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1, a2: A2, a3: A3, a4: A4) => R1
): (a1: A1, a2: A2, a3: A3, a4: A4) => R5
export function compose<A1, A2, A3, A4, R6, R5, R4, R3, R2, R1>(
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1, a2: A2, a3: A3, a4: A4) => R1
): (a1: A1, a2: A2, a3: A3, a4: A4) => R6
export function compose<A1, A2, A3, A4, R7, R6, R5, R4, R3, R2, R1>(
  f7: (a: R6) => R7,
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (a1: A1, a2: A2, a3: A3, a4: A4) => R1
): (a1: A1, a2: A2, a3: A3, a4: A4) => R7
// any-argument first function
export function compose<R2, R1>(
  f2: (a: R1) => R2,
  f1: (...args: any[]) => R1
): (...args: any[]) => R2
export function compose<R3, R2, R1>(
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: any[]) => R1
): (...args: any[]) => R3
export function compose<R4, R3, R2, R1>(
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: any[]) => R1
): (...args: any[]) => R4
export function compose<R5, R4, R3, R2, R1>(
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: any[]) => R1
): (...args: any[]) => R5
export function compose<R6, R5, R4, R3, R2, R1>(
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: any[]) => R1
): (...args: any[]) => R6
export function compose<R7, R6, R5, R4, R3, R2, R1>(
  f7: (a: R6) => R7,
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: any[]) => R1
): (...args: any[]) => R7
export function compose(
  f7: (a: any) => any,
  f6: (a: any) => any,
  f5: (a: any) => any,
  f4: (a: any) => any,
  f3: (a: any) => any,
  f2: (a: any) => any,
  f1: () => any,
  ...funcs: Array<Many<(...args: any[]) => any>>
): (...args: any[]) => any
export function compose(
  ...funcs: Array<Many<(...args: any[]) => any>>
): (...args: any[]) => any
export function compose(...funcs: any[]) {
  return funcs.reduce(_compose, identity)
}

function _compose<T, U, V>(
  a: (t: T) => U,
  b: (...args: V[]) => T
): (...args: V[]) => U {
  return (...args) => a(b(...args))
}

export const c = compose
