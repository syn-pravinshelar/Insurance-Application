const Deductible = require('../models/deductible');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.getDeductible = asyncHandler(async (req, res, next) => {
  const deductible = await Deductible.findById(req.params.id);

  if (!deductible) {
    return next(new ErrorResponse(`Deductible not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: deductible });
});

exports.createDeductible = asyncHandler(async (req, res) => {
  const deductible = await Deductible.create(req.body);

  res.status(201).json({
    success: true,
    data: deductible,
  });
});

// exports.getDeductible = (req, res, next) => {
//   Deductible.findById(req.params.id)
//     .then(response => {
//       if (response) {
//         res.status(200).json(response);
//       } else {
//         res.status(404).json({ message: `Deductible not found with id of ${req.params.id}`});
//       }
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: "Fetching Deductible failed!"
//       });
//     });
// };

// exports.createDeductible = (req, res, next) => {
//   //const url = req.protocol + "://" + req.get("host");
//   const deductible = new Deductible({
//     deductibleId: req.body.deductibleId,
//     definedAs: req.body.definedAs,
//     deductibleValue: req.body.deductibleValue,
//     aggregateValue: req.body.aggregateValue,
//     version: req.body.version
//   });
//   deductible
//     .save()
//     .then(createdPost => {
//       res.status(201).json({
//         message: "Deductible added successfully",
//         post: {
//           ...createdPost,
//           id: createdPost._id
//         }
//       });
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: "Error occured while creating new deductible."
//       });
//     });
// };
