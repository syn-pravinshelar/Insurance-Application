const MongoModel = require('../../models/form');
const AsyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/errorResponse');

const get = AsyncHandler(async (req, res, next) => {
  const result = await MongoModel.findOne({
    formId: req.params.id
  });

  if (!result) {
    return next(new ErrorResponse(`Resource not found with id of ${result.value}`, 404));
  }
  return res.status(200).json({
    data: {
      ...result.toObject()
    },
  });
});

const create = AsyncHandler(async (req, res) => {
  const model = new MongoModel({
    ...req.body
  });
  const result = await model.save();

  return res.status(200).json({
    data: {
      ...result.toObject()
    },
  });
});

const update = AsyncHandler(async (req, res, next) => {
  const model = await MongoModel.findOneAndUpdate({
    formId: req.params.id
  }, req.body, {
    new: true,
  });

  if (!model) {
    return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404));
  }

  const result = await model.save();

  return res.status(200).json({
    data: {
      ...result.toObject()
    },
  });
});

const remove = AsyncHandler(async (req, res, next) => {
  const result = await MongoModel.deleteOne({
    formId: req.params.id
  });

  if (!result.deletedCount) {
    return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404));
  }
  return res.status(200).json({
    data: {
      id: req.params.id
    },
  });
});

const list = AsyncHandler(async (req, res) => {
  const result = await MongoModel.find({
    formId: {
      $in: req.body.formId,
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