import { fromJS, Set } from 'immutable';
import createImmutableProxy from '../';

describe('Testing', () => {
  describe('Object == Map', () => {
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

    it('should support spreading', () => {
      const obj = { name: 'user', age: '22' };
      const map = fromJS(obj);
      const wrappedMap = createImmutableProxy(map);
      const value = { ...wrappedMap };
      expect(value).toEqual(obj);
    });

    it('should support rest', () => {
      const obj = { name: 'user', age: '22', sex: 'male' };
      const map = fromJS(obj);
      const wrappedMap = createImmutableProxy(map);
      const { name, ...rest } = wrappedMap;
      expect(name).toEqual(obj.name);
      expect(rest).toEqual({ age: '22', sex: 'male' });
    });
  });

  describe('Array == List', () => {
    it('should get value', () => {
      const arr = [1, 2, 3];
      const wrappedList = createImmutableProxy(fromJS(arr));
      const value = wrappedList[2];
      expect(value).toBe(3);
    });

    it('should support spreading', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [4, 5, 6];
      const list1 = fromJS(arr1);
      const list2 = fromJS(arr2);
      const value = [
        ...createImmutableProxy(list1),
        ...createImmutableProxy(list2)
      ];
      expect(value).toEqual(arr1.concat(arr2));
    });

    it('should support rest', () => {
      const arr = [1, 2, 3];
      const list = fromJS(arr);
      const [one, ...rest] = createImmutableProxy(list);
      expect(one).toBe(1);
      expect(rest).toEqual([2, 3]);
    });
  });
});
