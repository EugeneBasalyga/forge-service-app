const mapUserTOToUserVO = (userTO) => ({
  id: userTO.id,
  tenantId: userTO.tenantId,
  email: userTO.email,
  displayEmail: userTO.displayEmail,
  password: userTO.password,
  status: userTO.status,
  createdAt: userTO.createdAt,
  updatedAt: userTO.updatedAt,
  createdBy: userTO.createdBy,
  updatedBy: userTO.updatedBy,
  version: userTO.version,
});

const mapUserVOToUserResponse = (userVO) => ({
  id: userVO.id,
  tenantId: userVO.tenantId,
  email: userVO.displayEmail,
  status: userVO.status,
  createdAt: userVO.createdAt,
  updatedAt: userVO.updatedAt,
  createdBy: userVO.createdBy,
  updatedBy: userVO.updatedBy,
  version: userVO.version,
});

module.exports = {
  mapUserTOToUserVO,
  mapUserVOToUserResponse,
};
