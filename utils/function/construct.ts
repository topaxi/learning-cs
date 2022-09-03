export type Constructable = { new (...args: any[]): any }
export type ConstructFunction<C extends Constructable> = (
  ...args: ConstructorParameters<C>
) => InstanceType<C>

export function construct<C extends Constructable>(
  Klass: C
): ConstructFunction<C> {
  return (...args) => new Klass(...args)
}
