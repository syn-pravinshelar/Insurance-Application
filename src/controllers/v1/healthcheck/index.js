const mongoose = require('mongoose');
const AsyncHandler = require('../../../middleware/asyncHandler');
const AppError = require('../../../utils/appError');

const get = AsyncHandler(async (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return next(new AppError(500, `Could not connect to MongoDB`));
  }
  return res.status(200).json({ status: 'Success', message: 'Healthcheck Successful' });
});

module.exports = {
  get,
};
