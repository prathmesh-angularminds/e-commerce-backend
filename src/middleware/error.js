const httpStatus = require('http-status');

const errorHandler = (err,req,res,next) => {

    const {statusCode,message} = err;

    res.locals.errorMessage = message;

    console.log("Stack: ",err.stack);
    // response object
    const response = {
        code: statusCode,
        message,
        stack: err.stack
    }

    res.status(statusCode || httpStatus.INTERNAL_SERVER_ERROR   ).send(response);
}

module.exports = {
    errorHandler
}