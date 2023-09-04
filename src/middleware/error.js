const httpStatus = require('http-status');

const errorHandler = (err,req,res,next) => {

    console.log("In Error handler");

    const {statusCode,message} = err;

    res.locals.errorMessage = message;

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