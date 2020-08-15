const AsyncHandler = require('../../../middleware/asyncHandler');

const get = AsyncHandler(async (req, res) => {
  return res.status(200).json({});
});

module.exports = {
  get,
};
