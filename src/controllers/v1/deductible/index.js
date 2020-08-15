const MongoModel = require('../../../models/deductible');
const AsyncHandler = require('../../../middleware/asyncHandler');
const AppError = require('../../../utils/appError');

const get = AsyncHandler(async (req, res, next) => {
  const result = await MongoModel.findOne({ deductibleId: req.params.id });

  if (!result) {
    return next(new AppError(404, `Resource not found with id of ${result.value}`));
  }
  return res.status(200).json({
    data: { ...result.toObject() },
  });
});

const create = AsyncHandler(async (req, res) => {
  const model = new MongoModel({ ...req.body });
  const result = await model.save();

  return res.status(200).json({
    data: { ...result.toObject() },
  });
});

const update = AsyncHandler(async (req, res, next) => {
  const model = await MongoModel.findOneAndUpdate({ deductibleId: req.params.id }, req.body, {
    new: true,
  });

  if (!model) {
    return next(new AppError(404, `Resource not found with id of ${req.params.id}`));
  }

  const result = await model.save();

  return res.status(200).json({
    data: { ...result.toObject() },
  });
});

const remove = AsyncHandler(async (req, res, next) => {
  const result = await MongoModel.deleteOne({ deductibleId: req.params.id });

  if (!result.deletedCount) {
    return next(new AppError(404, `Resource not found with id of ${req.params.id}`));
  }
  return res.status(200).json({
    data: { id: req.params.id },
  });
});

const list = AsyncHandler(async (req, res) => {
  const result = await MongoModel.find({
    deductibleId: {
      $in: req.body.deductibleId,
    },
  });

  return res.status(200).json({
    data: [...result.map((item) => item.toObject())],
  });
});

module.exports = {
  create,
  get,
  update,
  remove,
  list,
};
