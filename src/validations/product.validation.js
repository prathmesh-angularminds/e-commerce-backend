const Joi = require('joi');

const createProduct = {
    body: Joi.object({
        name: Joi.string().min(3).max(30).required(),
        description: Joi.string().min(3).max(50).required(),
        price: Joi.number().min(10).max(1000000).required(),
        // productType: Joi.string().required(),
    }) 
}

module.exports = {
    createProduct   
}
