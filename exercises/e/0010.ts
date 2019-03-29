import { add } from '../../utils'
import { primes } from '../../utils/prime'

console.log(Array.from(primes(2e6)).reduce(add))
