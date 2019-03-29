import { range } from '../../utils'

for (let a of range(500)) {
  for (let b of range(500)) {
    let c = Math.sqrt(a ** 2 + b ** 2)

    if (a + b + c === 1000) {
      console.log(a * b * c)
      process.exit()
    }
  }
}
