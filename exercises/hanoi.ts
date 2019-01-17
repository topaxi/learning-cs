import { Stack } from '../data-structures/stack'

export function move(
  disks: number,
  stackFrom: Stack<number>,
  stackTo: Stack<number>,
  stackSpare: Stack<number>
) {
  if (stackFrom.empty) return
  if (disks === 1) return stackTo.push(stackFrom.pop())

  move(disks - 1, stackFrom, stackSpare, stackTo)
  move(1, stackFrom, stackTo, stackFrom)
  move(disks - 1, stackSpare, stackTo, stackFrom)
}
