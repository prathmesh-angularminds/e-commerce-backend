const Joi = require('joi');
const {objectId} = require('./custom.validation');

const createProduct = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().integer().min(5).max(100000).required(),
        // productType: Joi.string().required(),
    }) 
}

const getProductById = {
    params: Joi.object().keys({
        productId: Joi.required().custom(objectId)
    })
}

module.exports = {
    createProduct,
    getProductById
}
