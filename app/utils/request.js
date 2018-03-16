import axios from 'axios';
import { createBrowserHistory } from 'history';

axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const browserHistory = createBrowserHistory();

function parseJSON(response) {
  return response.data;
}

function handleError(response) {
  let err = JSON.stringify(response);
  err = JSON.parse(err);

  const { url } = err.response.config;
  const apiFlag = (url !== '/api/users/reset-password') && (url !== '/api/authentications');

  if (err.response.status === 401 && apiFlag) {
    console.log(browserHistory);
    browserHistory.push('/logout');
  }

  throw err.response.data;
}

export function getRequest(url) {
  return axios.get(url)
    .then(parseJSON)
    .catch(handleError);
}

export function postRequest(url, body) {
  return axios.post(url, body)
    .then(parseJSON)
    .catch(handleError);
}

export function putRequest(url, body) {
  return axios.put(url, body)
    .then(parseJSON)
    .catch(handleError);
}

export function deleteRequest(url) {
  return axios.delete(url)
    .then(parseJSON)
    .catch(handleError);
}

export function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}
