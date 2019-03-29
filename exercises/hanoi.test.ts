import { Stack } from '../data-structures'
import { range } from '../utils'
import { move } from './hanoi'

describe('hanoi', () => {
  test('should work', () => {
    let disks = 5
    let stack1 = Stack.from(range(disks))
    let stack2 = new Stack<number>()
    let stack3 = new Stack<number>()

    move(disks, stack1, stack3, stack2)

    expect(stack1.toString()).toBe('')
    expect(stack2.toString()).toBe('')
    expect(stack3.toString()).toBe('4,3,2,1,0')
  })
})
