import { expect } from 'chai'
import { Stack } from '../data-structures/stack/stack'
import { range } from '../utils/range'
import { move } from './hanoi'

describe.only('hanoi', () => {
  it('should work', () => {
    let disks = 5
    let stack1 = Stack.from(range(disks))
    let stack2 = new Stack<number>()
    let stack3 = new Stack<number>()

    move(disks, stack1, stack3, stack2)

    expect(stack1.toString()).to.equal('')
    expect(stack2.toString()).to.equal('')
    expect(stack3.toString()).to.equal('4,3,2,1,0')
  })
})
