import { range } from '../../utils/range'
import { add } from '../../utils/operators'

console.log(
  Array.from(range(1000))
    .filter(n => n % 3 === 0 || n % 5 === 0)
    .reduce(add)
)
