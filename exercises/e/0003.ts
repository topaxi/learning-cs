import { primes } from '../../utils/prime'

let n = 600851475143
let factors = []
for (let prime of primes(10000)) {
  if (n % prime === 0) {
    n /= prime
    factors.push(prime)
  }
}
console.log(factors[factors.length - 1])
