export const hasOwnProperty =
  Object.hasOwn ??
  ((obj: object, key: PropertyKey) =>
    Object.prototype.hasOwnProperty.call(obj, key))
