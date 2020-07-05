import * as R from 'ramda';

/**Encodes a javascript object to base64 Text */
export const encode = (obj = {}) => {
  try {
    return btoa(JSON.stringify(obj));
  } catch (e) {
    console.error(`JSON Object is not valid. Not throwing error for now`);
    return '';
  }
}

/** Decodes a base64 Text to a javascript object  */
export const decode = (string = '') => {
  try {
    return JSON.parse(atob(string));
  } catch (e) {
    console.error(`String is not in valid format. Not throwing error for now`);
    return {};
  }
}

/** Encodes a javascript object to base64 Text  */
export const encodeRoute = (route = {}) => {
  return R.pipe(
    R.pick(['name', 'hash', 'fullPath', 'path', 'params', 'query']),
    encode
  )(route);
}