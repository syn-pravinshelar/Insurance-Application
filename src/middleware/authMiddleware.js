const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const config = require('../config/config');
const AsyncHandler = require('./asyncHandler');

const authHandler = AsyncHandler(async (req, res, next) => {
  if (typeof req.headers.authorization !== 'undefined') {
    const token = req.headers.authorization.split(' ')[1];

    const valid = await jwt.verify(token, config.tokenSecretKey, config.jwtOptions);

    if (!valid) {
      return next(new AppError(401, 'Not Authorized'));
    }
    return next();
  }
  return next(new AppError(403, 'Missing Authentication Token'));
});

module.exports = authHandler;
