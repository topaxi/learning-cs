import { permutations } from './permutations'

describe('46. Permutations', () => {
  test('should generate each permutation', () => {
    expect(permutations([1, 2, 3])).toMatchSnapshot()
    expect(permutations([1, 2, 3, 4])).toMatchSnapshot()
  })
})
