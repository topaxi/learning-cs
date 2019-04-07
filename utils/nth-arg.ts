export const nthArg = (arg: number) => <T>(...args: T[]) => args[arg]
export const secondArg = nthArg(1) as <T>(a: unknown, b: T) => T
