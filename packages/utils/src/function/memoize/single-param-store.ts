import { ClearableWeakmap } from './clearable-weakmap'

export class SingleParamStore<T extends any[], U> extends Map<T, U> {
  get(key: T) {
    return super.get(key[1])
  }

  set(key: T, value: U) {
    return super.set(key[1], value)
  }

  has(key: T) {
    return super.has(key[1])
  }
}

export class WeakSingleParamStore<T extends any[], U> extends ClearableWeakmap<
  T,
  U
> {
  get(key: T) {
    return super.get(key[1])
  }

  set(key: T, value: U) {
    return super.set(key[1], value)
  }

  has(key: T) {
    return super.has(key[1])
  }
}
