const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

// const catchAsync = (asyncFunc) => {

//   return (req,res,next) => {
//     Promise.resolve(asyncFunc(req,res,next)).catch(err => next(err));
//   }
// }

module.exports = catchAsync;
  