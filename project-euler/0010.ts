import { primes } from '../utils/prime'

console.log(Array.from(primes(2e6)).reduce((a, b) => a + b))
