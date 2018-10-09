import { fromJS } from 'immutable';
import createImmutableProxy from '../';

describe('Testing', () => {
  it('should be able to access object property using dot property access', () => {
    const name = 'testing user';
    const map = fromJS({ name });
    const wrappedMap = createImmutableProxy(map);
    expect(wrappedMap.name).toBe(name);
  });

  it('should be able to access object property using bracket property access ', () => {
    const name = 'testing user';
    const map = fromJS({ name });
    const wrappedMap = createImmutableProxy(map);
    // eslint-disable-next-line
    expect(wrappedMap['name']).toBe(name);
  });

  it('should be able to access object property using object destructuring', () => {
    const name = 'testing user';
    const map = fromJS({ name });
    const { name: expected } = createImmutableProxy(map);
    expect(expected).toBe(name);
  });

  it('should be able to access next object property', () => {
    const name = 'testing user';
    const map = fromJS({ person: { basic: { name } } });
    const wrappedMap = createImmutableProxy(map);
    expect(wrappedMap.person.basic.name).toBe(name);
  });

  it('should be able to access immutable js attributes', () => {
    const name = 'testing user';
    const map = fromJS({ name });
    const wrappedMap = createImmutableProxy(map);
    expect(wrappedMap.size).toBe(map.size);
  });

  it('should be able to access immutable js methods', () => {
    const name = 'testing user';
    const map = fromJS({ name });
    const wrappedMap = createImmutableProxy(map);
    expect(wrappedMap.get(name)).toEqual(map.get(name));
    expect(wrappedMap.has(name)).toEqual(map.has(name));
  });

  it('should be immutable', () => {
    const name = 'testing user';
    const map = fromJS({ name });
    const wrappedMap = createImmutableProxy(map);
    const newWrappedMap = wrappedMap.set('name', 'new user');
    expect(newWrappedMap === wrappedMap).toBe(false);
    expect(newWrappedMap.name).toBe('new user');
    expect(wrappedMap.name).toBe(name);
  });

  it('should throw an error when a non immutable object is passed in', () => {
    const func = () => {
      const jsMap = new Map();
      createImmutableProxy(jsMap, true);
    };
    expect(func).toThrow(new Error('Expected an immutable object'));
  });
});
