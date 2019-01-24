function* fib() {
  let current = 1
  let previous = 1
  let fib = 0

  for (;;) {
    fib = current + previous
    yield fib
    previous = current
    current = fib
  }

  return fib
}

let sum = 0
for (let f of fib()) {
  if (f >= 4e6) break

  if (f % 2 === 0) {
    sum += f
  }
}
console.log(sum)
