export function removeElement(nums: number[], val: number): void {
  for (let i = 0; i < nums.length; ) {
    if (nums[i] === val) {
      nums.splice(i, 1)
    } else {
      i++
    }
  }
}
