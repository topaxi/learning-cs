import { args } from './args'

describe('utils/function/args', () => {
  test('should return arguments', () => {
    expect(args(1, 2, 3, 4)).toEqual([1, 2, 3, 4])
  })
})
