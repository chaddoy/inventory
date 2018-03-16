import axios from 'axios';
import { handleJwtToken, expireJwtToken } from 'utils/jwtToken';

describe('jwtToken', () => {
  beforeEach(() => {
    class LocalStorageMock {
      constructor() {
        this.store = {};
      }

      clear() {
        this.store = {};
      }

      getItem(key) {
        return this.store[key] || null;
      }

      setItem(key, value) {
        this.store[key] = value.toString();
      }

      removeItem(key) {
        delete this.store[key];
      }
    }

    global.localStorage = new (LocalStorageMock)();
  });

  describe('handleJwtToken', () => {
    it('should store token to `localStorage` and `axios` config', () => {
      const setItemSpy = jest.spyOn(global.localStorage, 'setItem');
      handleJwtToken('token');
      expect(setItemSpy).toHaveBeenCalledTimes(1);
      expect(global.localStorage.getItem('capd.token')).toEqual('token');
      expect(axios.defaults.headers.common.Authorization)
        .toEqual('Bearer token');
      setItemSpy.mockReset();
      setItemSpy.mockRestore();
    });
  });

  describe('expireJwtToken', () => {
    it('should remove token and user to `localStorage` and `axios`', () => {
      const removeItemSpy = jest.spyOn(global.localStorage, 'removeItem');
      expireJwtToken();
      expect(removeItemSpy).toHaveBeenCalledTimes(2);
      expect(global.localStorage.getItem('capd.token')).toBeNull();
      expect(global.localStorage.getItem('capd.user')).toBeNull();
      expect(axios.defaults.headers.common.Authorization).toBeUndefined();
      removeItemSpy.mockReset();
      removeItemSpy.mockRestore();
    });
  });
});
