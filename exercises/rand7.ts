import { range } from '../utils/range'

function rand5(): number {
  return Math.floor(Math.random() * 5) + 1
}

export function rand7(): number {
  let r = 0
  for (let i of range(7)) {
    r += rand5()
  }
  return (r % 7) + 1
}
