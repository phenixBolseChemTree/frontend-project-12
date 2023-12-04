const apiPrefix = '/api/v1';

export default {
  data: [apiPrefix, 'data'].join('/'),
  login: [apiPrefix, 'login'].join('/'),
  signup: [apiPrefix, 'signup'].join('/'),
};
