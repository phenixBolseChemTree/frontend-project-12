const apiPrefix = '/api/v1';

export default {
  me: [apiPrefix, 'data'].join('/'),
  login: [apiPrefix, 'login'].join('/'),
  signup: [apiPrefix, 'signup'].join('/'),
};
