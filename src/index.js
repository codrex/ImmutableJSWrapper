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
      return createImmutableProxy(value);
    }

    // when targeting attribute and method attached to an immutable collections
    const attribute = target[name];

    // when attribute is a method call the method and pass in any argument passed
    if (typeof attribute === 'function') {
      return (...args) => {
        const value = attribute.apply(target, args);
        // if value return is an immutable collections return the value as a proxy
        return createImmutableProxy(value);
      };
    }
    return attribute;
  }
}

// wraps a value in a proxy when value is an immutable collections
function createImmutableProxy(value, throwError = false) {
  if (!isImmutable(value)) {
    if (throwError) throw new Error('Expected an immutable object');
    return value;
  }

  const handler = new Handler();
  return new Proxy(value, handler);
}

function immutableWrapper(immutableObject) {
  return createImmutableProxy(immutableObject, true);
}

export default immutableWrapper;
