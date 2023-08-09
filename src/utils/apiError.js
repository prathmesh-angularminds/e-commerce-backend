
class ApiError extends Error {

    constructor(statusCode,message,stack="") {

        super(message);
        this.statusCode = statusCode;

        if(stack) {
            this.stack = stack;
        } else {
            // pass stack trace in our this variable and do not show call to our this.constructor in stack trace
            Error.captureStackTrace(this,this.constructor);
        }
    }
}

module.exports = ApiError