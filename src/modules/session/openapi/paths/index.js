const refreshSessionPath = require('./refresh-session.path');

module.exports = {
  '/sessions/refresh': {
    ...refreshSessionPath,
  },
};
