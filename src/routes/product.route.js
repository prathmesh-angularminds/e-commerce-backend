const express = require('express');
const router = express.Router();
const { productController } = require('./../controllers/index');
const { productValidation } = require('./../validations/index');

// Route for / path
// router.route('')
// .get();

// Route for /add-new-product path
router.route('/')
    .get(productController.getProducts)
    .post((req,res,next) => {
        const {value,error} = productValidation.createProduct.validate(req.body, {abortEarly: false});
        if(error) {
            console.log("Error: ",error);
        } else {
            console.log("Value: ",value);
        }
        next();
    },productController.createProduct)

router.route('/:productId')
    .get(productController.getProductById)
    .delete(productController.deleteProductById)
    .patch(productController.updateProductById)

module.exports = router;
