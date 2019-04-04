import { LinkedList } from '../data-structures'

export function add(a: number, b: number): number {
  return a + b
}

export function concat(a: string, b: string): string
export function concat<T>(a: LinkedList<T>, b: LinkedList<T>): LinkedList<T>
export function concat<T>(a: ConcatArray<T>, b: ConcatArray<T>): T[]
// eslint-disable-next-line
export function concat(a: any, b: any): any {
  return a.concat(b)
}