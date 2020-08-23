const MongoModel = require('../../models/endorsement');
const Deductible = require('../../models/deductible');
const AsyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/errorResponse');

const get = AsyncHandler(async (req, res, next) => {
  const model = await MongoModel.findById(req.params.id);

  if (!model) {
    return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: model
  });
});



const create = AsyncHandler(async (req, res, next) => {
  let deductibleId = req.body.deductibles;
  console.log(deductibleId);

  if (deductibleId) {
    let deductible = await Deductible.findById(deductibleId);
    if (!deductible) {
      return next(new ErrorResponse(`Deductible not found with id : ${deductibleId}`, 404));
    }
  } else {
    return next(new ErrorResponse(`Please add Deductible Id`, 404));
  }


  const model = await MongoModel.create(req.body);

  res.status(201).json({
    success: true,
    data: model
  });

});

const update = AsyncHandler(async (req, res, next) => {

  let model = await MongoModel.findById(req.params.id);

  if (!model) {
    return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404));
  }

  let deductibleId = req.body.deductibles;

  if (deductibleId) {
    let deductible = await Deductible.findById(deductibleId);

    if (!deductible) {
      return next(new ErrorResponse(`Deductible not found with id : ${deductibleId}`, 404));
    }
  } else {
    return next(new ErrorResponse(`Please add Deductible Id`, 404));
  }


  model = await MongoModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: model
  });
});

const remove = AsyncHandler(async (req, res, next) => {

  const model = await MongoModel.findById(req.params.id);

  if (!model) {
    return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404));
  }

  await model.remove();

  res.status(200).json({
    success: true,
    data: {}
  });

});

const getAll = AsyncHandler(async (req, res, next) => {
  const responseData = await MongoModel.find();
  res.status(200).json({
    success: true,
    data: responseData
  });
});


module.exports = {
  create,
  get,
  update,
  remove,
  getAll
};