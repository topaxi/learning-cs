export function findComplement(num: number): number {
  let str = num.toString(2)
  let res = 0

  for (let i = str.length, e = 0; i-- > 0; e++) {
    if (str[i] === '0') res = res + Math.pow(2, e)
  }

  return res
}
