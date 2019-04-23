import { range } from '../utils/range'
import { map, reverse, foreach } from '../utils/iterator'

// http://lisperator.net/blog/a-little-javascript-problem/
describe('a-little-javascript-problem', () => {
  test('should calculate squares from 1-10', () => {
    let result: number[] = []
    let numbers: Iterable<number> = range(1, 10, { inclusive: true })
    numbers = map(numbers, n => n * n)
    numbers = reverse(numbers)
    foreach(numbers, n => result.push(n))
    expect(result).toEqual([100, 81, 64, 49, 36, 25, 16, 9, 4, 1])
  })
})
