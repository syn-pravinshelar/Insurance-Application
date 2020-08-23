const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const config = require('../config/config');
const AsyncHandler = require('./asyncHandler');

const authHandler = AsyncHandler(async (req, res, next) => {
  if (typeof req.headers.authorization !== 'undefined') {
    const token = req.headers.authorization.split(' ')[1];

    const valid = await jwt.verify(token, config.tokenSecretKey, config.jwtOptions);

    if (!valid) {
      return next(new ErrorResponse('Not Authorized', 401));
    }
    return next();
  }
  return next(new ErrorResponse('Missing Authentication Token', 403));
});

module.exports = authHandler;