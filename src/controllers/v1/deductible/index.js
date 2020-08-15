const Deductible = require('../../../models/deductible');
const AsyncHandler = require('../../../middleware/asyncHandler');
const AppError = require('../../../utils/appError');

const get = AsyncHandler(async (req, res, next) => {
  const result = await Deductible.findById(req.params.id);

  if (!result) {
    return next(new AppError(404, `Resource not found with id of ${result.value}`));
  }
  return res.status(200).json({
    data: { result },
  });
});

const create = AsyncHandler(async (req, res) => {
  const model = new Deductible({ ...req.body });
  const result = await model.save();

  return res.status(200).json({
    data: { result },
  });
});

const post = AsyncHandler(async (req, res) => {
  const model = new Deductible();
  const result = await model.find();

  return res.status(200).json({
    data: { result },
  });
});

const update = AsyncHandler(async (req, res) => {
  const model = new Deductible();
  const result = await model.find();

  return res.status(200).json({
    data: { result },
  });
});

const remove = AsyncHandler(async (req, res) => {
  const model = new Deductible();
  const result = await model.find();

  return res.status(200).json({
    data: { result },
  });
});

const list = AsyncHandler(async (req, res) => {
  const model = new Deductible();
  const result = await model.find();

  return res.status(200).json({
    data: { result },
  });
});

module.exports = {
  create,
  get,
  post,
  list,
  update,
  remove,
};
