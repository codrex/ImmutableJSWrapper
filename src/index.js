import { isImmutable } from 'immutable';
/**
 * This a simple proxy wrapper around immutable js collections.
 * It makes getting values from an immutable js collections behave the same
 * way as javascript objects.
 */
/* eslint-disable class-methods-use-this */
class Handler {
  get(target, name) {
    // when targeting that value store in the immutable collections
    const isNameInTarget = target.has(name);
    if (isNameInTarget) {
      const value = target.get(name);
      return this.wrapValueWhenImmutable(value);
    }

    // when targeting attribute and method attached to an immutable collections
    const attribute = target[name];

    // when attribute is a method call the method and pass in any argument passed
    if (typeof attribute === 'function') {
      return (...args) => {
        const value = attribute.apply(target, args);
        // if value return is an immutable collections return the value as a proxy
        return this.wrapValueWhenImmutable(value);
      };
    }
    return attribute;
  }

  // wraps a value in a proxy when value is an immutable collections
  wrapValueWhenImmutable(value) {
    if (isImmutable(value)) {
      const handler = new Handler();
      return new Proxy(value, handler);
    }
    return value;
  }
}

function immutableWrapper(immutableObject) {
  if (!isImmutable(immutableObject))
    throw new Error('Expected an immutable object');
  const handler = new Handler();
  return new Proxy(immutableObject, handler);
}

export default immutableWrapper;
