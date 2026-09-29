const loginPath = require('./login.path');
const logoutPath = require('./logout.path');

module.exports = {
  '/auth/login': {
    ...loginPath,
  },
  '/auth/logout': {
    ...logoutPath,
  },
};
