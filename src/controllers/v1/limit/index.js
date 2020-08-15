const MongoModel = require('../../../models/limit');
const AsyncHandler = require('../../../middleware/asyncHandler');
const AppError = require('../../../utils/appError');

const get = AsyncHandler(async (req, res, next) => {
  const result = await MongoModel.findOne({ limitId: req.params.id });

  if (!result) {
    return next(new AppError(404, `Resource not found with id of ${result.value}`));
  }
  return res.status(200).json({
    data: { result },
  });
});

const create = AsyncHandler(async (req, res) => {
  const model = new MongoModel({ ...req.body });
  const result = await model.save();

  return res.status(200).json({
    data: { result },
  });
});

const update = AsyncHandler(async (req, res) => {
  const model = await MongoModel.findOneAndUpdate({ limitId: req.params.id }, req.body, {
    new: true,
  });

  const result = await model.save();

  return res.status(200).json({
    data: { result },
  });
});

const remove = AsyncHandler(async (req, res, next) => {
  const result = await MongoModel.deleteOne({ limitId: req.params.id });

  if (!result.deletedCount) {
    return next(new AppError(404, `Resource not found with id of ${req.params.id}`));
  }
  return res.status(200).json({
    data: { id: req.params.id },
  });
});

const list = AsyncHandler(async (req, res) => {
  const result = await MongoModel.find({
    limitId: {
      $in: req.body.limitId,
    },
  });

  return res.status(200).json({
    data: { result },
  });
});

module.exports = {
  create,
  get,
  update,
  remove,
  list,
};
