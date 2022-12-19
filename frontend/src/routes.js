const apiPath = 'api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  chatsPath: () => [apiPath, 'data'].join('/'),
};

export default routes;
