import { arity } from './arity'

describe('utils/arity', () => {
  let nAry: (...args: unknown[]) => unknown[]

  beforeEach(() => {
    nAry = (...args) => args
  })

  test('should limit function arity to given number', () => {
    expect(arity(0 as number, nAry)(0, 1, 2, 3, 4, 5)).toEqual([])
    expect(arity(1 as number, nAry)(0, 1, 2, 3, 4, 5)).toEqual([0])
    expect(arity(2 as number, nAry)(0, 1, 2, 3, 4, 5)).toEqual([0, 1])
    expect(arity(5 as number, nAry)(0, 1, 2, 3, 4, 5)).toEqual([0, 1, 2, 3, 4])
  })

  test('should reflect arity in fn length', () => {
    expect(arity(0, nAry)).toHaveLength(0)
    expect(arity(1, nAry)).toHaveLength(1)
    expect(arity(2, nAry)).toHaveLength(2)
    expect(arity(5, nAry)).toHaveLength(5)

    expect(arity(2, arity(5, nAry))).toHaveLength(2)
  })
})
