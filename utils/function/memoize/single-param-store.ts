import { ClearableWeakmap } from './clearable-weakmap'

export class SingleParamStore<T extends any[], U> extends Map<T, U> {
  override get(key: T) {
    return super.get(key[1])
  }

  override set(key: T, value: U) {
    return super.set(key[1], value)
  }

  override has(key: T) {
    return super.has(key[1])
  }
}

export class WeakSingleParamStore<T extends any[], U> extends ClearableWeakmap<
  T,
  U
> {
  override get(key: T) {
    return super.get(key[1])
  }

  override set(key: T, value: U) {
    return super.set(key[1], value)
  }

  override has(key: T) {
    return super.has(key[1])
  }
}
