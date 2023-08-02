const Joi = require('joi');

const createProduct = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    hasOffer: Joi.boolean().required()
})

module.exports = {
    createProduct   
}

// console.log(createProduct)