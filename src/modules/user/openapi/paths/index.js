const getCurrentUserPath = require('./get-current-user.path');

module.exports = {
  '/users/current': {
    ...getCurrentUserPath,
  },
};
