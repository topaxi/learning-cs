import { zip } from './zip'

describe('utils/iterator/zip', () => {
  test('should zip two iterables', () => {
    function* numbers() {
      yield 1
      yield 2
      yield 3
    }
    function* letters() {
      yield 'a'
      yield 'b'
      yield 'c'
    }

    expect(Array.from(zip(numbers(), letters()))).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ])
  })

  test('should stop on first iterable completion', () => {
    function* numbers() {
      yield 1
      yield 2
    }
    function* letters() {
      yield 'a'
      yield 'b'
      yield 'c'
    }

    expect(Array.from(zip(numbers(), letters()))).toEqual([
      [1, 'a'],
      [2, 'b'],
    ])
  })
})
