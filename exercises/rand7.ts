import { range } from '../utils/range'

const { floor, random } = Math

function rand5(): number {
  return floor(random() * 5) + 1
}

export function rand7(): number {
  let r = 0
  range(7).forEach(() => (r += rand5()))
  return (r % 7) + 1
}

export function rand7m5(): number {
  let rnd = '1234567'.repeat(3)
  let r = 0
  do {
    r = Number(rnd[(rand5() - 1) * 5 + (rand5() - 1)]) | 0
  } while (r === 0)
  return r
}
