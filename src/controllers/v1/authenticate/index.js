const jwt = require('jsonwebtoken');
const AsyncHandler = require('../../../middleware/asyncHandler');
const AppError = require('../../../utils/appError');
const config = require('../../../config/config');

const users = [
  { userid: 1, username: 'user1', password: 'express' },
  { userid: 2, username: 'user2', password: 'mongodb' },
  { userid: 3, username: 'user3', password: 'jwt' },
  { userid: 4, username: 'user4', password: 'synechron' },
];

const get = AsyncHandler(async ({ body: { username = '', password = '' } }, res, next) => {
  if (username === '' || password === '') {
    return next(new AppError(400, `Username or Password is missing`));
  }

  const validUser = users.find((user) => user.username === username && user.password === password);

  if (validUser && Object.entries(validUser).length > 0) {
    const token = jwt.sign({ validUser }, config.tokenSecretKey, config.jwtOptions);
    return res.status(200).json({
      token,
    });
  }
  return next(new AppError(400, `Authentication Failed`));
});

module.exports = {
  get,
};
