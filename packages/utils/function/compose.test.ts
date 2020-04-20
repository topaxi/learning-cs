import { c, compose } from './compose'

describe('utils/function/compose', () => {
  test('c alias', () => {
    expect(c).toBe(compose)
  })

  test('should compose functions', () => {
    expect(
      compose(
        args => ({ args }),
        (a: string, b: string) => [a, b]
      )('a', 'b')
    ).toEqual({ args: ['a', 'b'] })

    expect(
      compose<string, string, string, { args: string[] }, string[]>(
        ({ args }) => args.join(','),
        args => ({ args }),
        (a: string, b: string) => [a, b]
      )('a', 'b')
    ).toEqual('a,b')
  })
})
