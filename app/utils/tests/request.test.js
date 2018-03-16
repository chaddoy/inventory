import axios from 'axios';

import {
  browserHistory,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '../request';

jest.mock('axios');

describe('request', () => {
  let error400;

  beforeEach(() => {
    error400 = {
      response: {
        data: 'Error',
        status: 400,
        config: {
          url: '/api/authentications',
        },
      },
    };
  });

  describe('getRequest', () => {
    afterEach(() => {
      axios.get.mockReset();
      axios.get.mockRestore();
    });

    it('should get data successfully', () => {
      const data = [{ name: 'Bob' }];
      const promise = Promise.resolve({ data });
      axios.get.mockReturnValue(promise);
      expect(getRequest('/users')).resolves.toBe(data);
    });

    describe('unsuccessful request', () => {
      it('should return error `data`', () => {
        const promise = Promise.reject(error400);
        axios.get.mockReturnValue(promise);
        expect(getRequest('/users')).rejects.toBe(error400.response.data);
      });

      it.skip('should return error `data`', () => {
        const error = {
          response: {
            data: 'Error',
            status: 401,
            config: {
              url: '/api/users',
            },
          },
        };
        const pushSpy = jest.spyOn(browserHistory, 'push');
        const promise = Promise.reject(error);
        axios.get.mockReturnValue(promise);
        getRequest('/users');
        expect(browserHistory.push).toHaveBeenCalledWith(pushSpy);
        browserHistory.push.mockReset();
        browserHistory.push.mockRestore();
      });
    });
  });

  describe('postRequest', () => {
    afterEach(() => {
      axios.post.mockReset();
      axios.post.mockRestore();
    });

    it('should save data successfully', () => {
      const data = { name: 'Bob' };
      const promise = Promise.resolve({ data });
      axios.post.mockReturnValue(promise);
      expect(postRequest('/users', data)).resolves.toBe(data);
    });

    it('should return error `data` if request is unsuccessfully', () => {
      const promise = Promise.reject(error400);
      axios.post.mockReturnValue(promise);
      expect(postRequest('/users', {})).rejects.toBe(error400.response.data);
    });
  });

  describe('putRequest', () => {
    afterEach(() => {
      axios.put.mockReset();
      axios.put.mockRestore();
    });

    it('should edit data successfully', () => {
      const data = { name: 'Bob' };
      const promise = Promise.resolve({ data });
      axios.put.mockReturnValue(promise);
      expect(putRequest('/users', data)).resolves.toBe(data);
    });

    it('should return error `data` if request is unsuccessfully', () => {
      const promise = Promise.reject(error400);
      axios.put.mockReturnValue(promise);
      expect(putRequest('/users', {})).rejects.toBe(error400.response.data);
    });
  });

  describe('deleteRequest', () => {
    afterEach(() => {
      axios.delete.mockReset();
      axios.delete.mockRestore();
    });

    it('should edit data successfully', () => {
      const data = { name: 'Bob' };
      const promise = Promise.resolve({ data });
      axios.delete.mockReturnValue(promise);
      expect(deleteRequest('/users')).resolves.toBe(data);
    });

    it('should return error `data` if request is unsuccessfully', () => {
      const promise = Promise.reject(error400);
      axios.delete.mockReturnValue(promise);
      expect(deleteRequest('/users')).rejects.toBe(error400.response.data);
    });
  });
});
