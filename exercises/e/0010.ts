import { primes } from '../../utils/prime'
import { add } from '../../utils/operators'

console.log(Array.from(primes(2e6)).reduce(add))
