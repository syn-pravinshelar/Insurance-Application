const jwt = require('jsonwebtoken');
const AsyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/errorResponse');
const config = require('../../config/config');

const users = [{
    userid: 1,
    username: 'user1',
    password: 'express'
  },
  {
    userid: 2,
    username: 'user2',
    password: 'mongodb'
  },
  {
    userid: 3,
    username: 'user3',
    password: 'jwt'
  },
  {
    userid: 4,
    username: 'user4',
    password: 'synechron'
  },
];

const get = AsyncHandler(async ({
  body: {
    username = '',
    password = ''
  }
}, res, next) => {
  if (username === '' || password === '') {
    return next(new ErrorResponse(`Username or Password is missing`, 400));
  }

  const validUser = users.find((user) => user.username === username && user.password === password);

  if (validUser && Object.entries(validUser).length > 0) {
    const token = jwt.sign({
      validUser
    }, config.tokenSecretKey, config.jwtOptions);
    return res.status(200).json({
      token,
    });
  }
  return next(new ErrorResponse(`Authentication Failed`, 400));
});

module.exports = {
  get,
};