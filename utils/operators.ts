import { LinkedList } from '../data-structures/list/linked-list'

export function add(a: bigint, b: bigint): bigint
export function add(a: number, b: number): number
export function add(a: any, b: any): any {
  return a + b
}

export function concat(a: string, b: string): string
export function concat<T>(a: LinkedList<T>, b: LinkedList<T>): LinkedList<T>
export function concat<T>(a: ConcatArray<T>, b: ConcatArray<T>): T[]
export function concat(a: any, b: any): any {
  return a.concat(b)
}
