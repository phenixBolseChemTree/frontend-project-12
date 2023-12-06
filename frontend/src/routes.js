const apiPrefix = '/api/v1';

export default {
  apiData: [apiPrefix, 'data'].join('/'),
  apiLogin: [apiPrefix, 'login'].join('/'),
  apiSignup: [apiPrefix, 'signup'].join('/'),
  login: '/login',
  signup: '/signup',
  chat: '/',
};
