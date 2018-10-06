import { fromJS } from 'immutable';
import immutableWrapper from '../';

describe('Testing', () => {
  it('should be able to access object property using dot property access', () => {
    const name = 'testing user';
    const map = fromJS({ name });
    const wrappedMap = immutableWrapper(map);
    expect(wrappedMap.name).toBe(name);
  });

  it('should be able to access object property using bracket property access ', () => {
    const name = 'testing user';
    const map = fromJS({ name });
    const wrappedMap = immutableWrapper(map);
    // eslint-disable-next-line
    expect(wrappedMap["name"]).toBe(name);
  });

  it('should be able to access object property using object destructuring', () => {
    const name = 'testing user';
    const map = fromJS({ name });
    const { name: expected } = immutableWrapper(map);
    expect(expected).toBe(name);
  });

  it('should be able to access next object property', () => {
    const name = 'testing user';
    const map = fromJS({ person: { basic: { name } } });
    const wrappedMap = immutableWrapper(map);
    expect(wrappedMap.person.basic.name).toBe(name);
  });

  it('should be able to access immutable js attributes', () => {
    const name = 'testing user';
    const map = fromJS({ name });
    const wrappedMap = immutableWrapper(map);
    expect(wrappedMap.size).toBe(map.size);
  });

  it('should be able to access immutable js methods', () => {
    const name = 'testing user';
    const map = fromJS({ name });
    const wrappedMap = immutableWrapper(map);
    expect(wrappedMap.get(name)).toEqual(map.get(name));
    expect(wrappedMap.has(name)).toEqual(map.has(name));
  });

  it('should throw an error when a non immutable object is passed in', () => {
    const func = () => {
      const jsMap = new Map();
      immutableWrapper(jsMap);
    };
    expect(func).toThrow(new Error('Expected an immutable object'));
  });
});
