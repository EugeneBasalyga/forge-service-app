const { mapUserVOToUserResponse } = require('./user.mapper');

const mapUserVOToGetCurrentUserResponse = (userVO) => ({
  ...mapUserVOToUserResponse(userVO),
});

module.exports = {
  mapUserVOToGetCurrentUserResponse,
};
