import { knapsack, Item } from './knapsack'

describe('Knapsack', () => {
  test('should return maximum value to steal', () => {
    let items: Item[] = [
      { value: 10, size: 5 },
      { value: 15, size: 5 },
      { value: 100, size: 10 }
    ]

    expect(knapsack(items, 10)).toBe(100)
  })

  test('should work with a lot of items', () => {
    let items: Item[] = [
      { value: 10, size: 5 },
      { value: 15, size: 5 },
      { value: 15, size: 5 },
      { value: 100, size: 10 },
      { value: 1000, size: 20 },
      { value: 50, size: 1 },
      { value: 10, size: 5 },
      { value: 10, size: 5 },
      { value: 50, size: 1 },
      { value: 50, size: 1 },
      { value: 50, size: 1 },
      { value: 50, size: 1 },
      { value: 10, size: 5 },
      { value: 10, size: 5 },
      { value: 1, size: 2 },
      { value: 1, size: 2 },
      { value: 10, size: 5 },
      { value: 10, size: 5 },
      { value: 1, size: 2 },
      { value: 100, size: 10 },
      { value: 100, size: 10 },
      { value: 100, size: 10 },
      { value: 1, size: 2 },
      { value: 1000, size: 25 },
      { value: 1000, size: 25 },
      { value: 1000, size: 50 },
      { value: 1, size: 2 },
      { value: 15, size: 5 },
      { value: 15, size: 5 },
      { value: 1, size: 1 },
      { value: 1, size: 2 },
      { value: 15, size: 5 }
    ]

    expect(knapsack(items, 100)).toBe(3465)
  })
})
