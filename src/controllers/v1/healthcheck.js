const mongoose = require('mongoose');
const AsyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/errorResponse');

const get = AsyncHandler(async (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return next(new ErrorResponse(`Could not connect to MongoDB`, 500));
  }
  return res.status(200).json({
    status: 'Success',
    message: 'Healthcheck Successful'
  });
});

module.exports = {
  get,
};