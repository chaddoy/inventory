import { setAuthorizationToken } from './request';

/**
 * Parses the JWT token received from the server. Sets the token on the
 * localStorage and add the token to the axios request headers.
 *
 * @param  {Object} data A hash with an access_token
 *
 * @return {Object} Returns the decoded token
 */
export function handleJwtToken(token) {
  localStorage.setItem('capd.token', token);
  setAuthorizationToken(token);
}

/**
 * This method removes the current JwtToken, invalidating the session
 *
 * @return null
 */
export function expireJwtToken() {
  localStorage.removeItem('capd.token');
  localStorage.removeItem('capd.user');
  setAuthorizationToken();
  return null;
}
