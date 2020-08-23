// const AppError = require('../utils/appError');

// /*
// PreDefined or Known error sets
// */

// const standard400Errors = ['ValidationError', 'ReferenceError'];
// const standard404Errors = ['CastError'];
// const standardAuthError = ['TokenExpiredError'];
// /*
// The purpose of the AsyncHandler is to catch all errors from the async functions that it wraps
// */
// const AsyncHandler = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch((err) => {
//       console.log(err.name);
//       if (err.name) {
//         if (standard400Errors.includes(err.name)) {
//           console.log('standard400Errors');
//           console.log(err.message);
//           next(new AppError(400, err.message));
//         } else if (err.name && standard404Errors.includes(err.name)) {
//           next(new AppError(404, err.message));
//         } else if (err.name && standardAuthError.includes(err.name)) {
//           next(new AppError(401, err.message));
//         } else {
//           next(err);
//         }
//       } else {
//         next(err);
//       }
//     });
//   };
// };

// module.exports = AsyncHandler;

const AsyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = AsyncHandler;