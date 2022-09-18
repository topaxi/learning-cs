import { paR } from '../function/partial'
import { add } from '../operators'
import { reduce } from './reduce'

export const sum = paR(reduce<number>, add, 0)
export const sumBigInt = paR(reduce<bigint>, add, 0n)
