import axios from 'axios';
import {Environment} from '../../config/environment';

// Set default params and headers for axios
axios.defaults.baseURL = Environment.BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';

axios.interceptors.response.use(
  function (response) {
    console.log('interceptor response', response);
    return response;
  },
  function (error) {
    console.log('interceptor response error', error);
    return Promise.reject(error);
  },
);

axios.interceptors.request.use(
  function (response) {
    console.log('interceptor request', response);
    return response;
  },
  function (error) {
    console.log('interceptor request error', error);
    return Promise.reject(error);
  },
);

const AxiosService = function () {
  let AuthorizationToken = null;

  function addHeaders(userConfig) {
    const globalHeaders = {};

    // You can set global headers here
    if (AuthorizationToken) {
      globalHeaders.Authorization = AuthorizationToken;
    }

    const {params, headers, ...restConfigs} = userConfig;
    const {filter, ...restParams} = params || {};

    // Return extended config
    return {
      ...restConfigs,
      headers: {
        ...globalHeaders,
        ...headers,
      },
      params: {
        ...restParams,
        // filter: JSON.stringify(filter || {}),
      },
    };
  }

  //get authorization token
  function getAuthorizationToken() {
    console.log(
      getAuthorizationToken,
      'getAuthorizationToken.................................',
    );
    return AuthorizationToken;
  }

  // Set authorization token
  function setAuthorizationToken(token) {
    AuthorizationToken = `Bearer ${token}`;
  }

  //get Remove Token
  function removeToken() {
    AuthorizationToken = null;
  }

  // GET method
  function get(endPoint, userConfig = {}) {
    return axios.get(endPoint, addHeaders(userConfig));
  }

  // POST method
  function post(endPoint, params = {}, userConfig = {}) {
    return axios.post(endPoint, params, addHeaders(userConfig));
  }

  // PUT method
  function put(endPoint, params = {}, userConfig = {}) {
    return axios.put(endPoint, params, addHeaders(userConfig));
  }

  // DELETE method
  function remove(endPoint, params = {}, userConfig = {}) {
    return axios.delete(endPoint, addHeaders(userConfig));
  }

  return {
    removeToken,
    setAuthorizationToken,
    getAuthorizationToken,
    get,
    post,
    put,
    remove,
  };
};

export default AxiosService();
