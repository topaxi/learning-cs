export const nthArg = (arg: number) => <T>(...args: T[]) => args[arg - 1]
export const secondArg = <T>(a: unknown, b: T): T => b
