const { floor } = Math

export function singleNonDuplicate(nums: readonly number[]): number {
  let lo = 0
  let hi = nums.length - 1

  while (lo < hi) {
    let mi = floor((hi + lo) / 2)

    // 0123456
    // 0011233
    //    ^
    //    hi is uneven, we always want to look at the first number of a pair
    //   ^ shift index one to the left and continue
    mi -= mi % 2

    // 012345678
    // 001223344
    //     ^ right hand side is different, single number is on the left
    if (nums[mi] !== nums[mi + 1]) hi = mi
    // 012345678
    // 001122344
    //     ^ right hand side is equal, number is at least two to the right
    else lo = mi + 2
  }

  return nums[lo]!
}
