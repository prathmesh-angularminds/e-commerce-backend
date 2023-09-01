const joi = require('joi')
const pick = require('../utils/pick');
const httpStatus = require('http-status');

const validate = (schema) => (req,res,next) => {
    const validSchema = pick(schema,['params','query','body'])
    console.log(validSchema)
    const object = pick(req,Object.keys(validSchema));

    const {value,error} = joi.compile(validSchema).validate(object);

    if(error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        throw next(new ApiError(httpStatus.BAD_REQUEST,errorMessage))
    }

    Object.assign(req,value);
    return next();
}

module.exports = validate;