const express = require('express');
const router = express.Router();
const { productController } = require('./../controllers/index');
const validate = require('../middleware/validate');
const { productValidation } = require('../validations/index');
const multer = require('multer');

// File types which should be accepted
const fileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().split('T')[0] + '_' + file.originalname)
    }
})

// Filtering files
const fileFilter = (req, file, cb) => {

    // If mimetype includes in the fileTypes list then execute if else execute else statement
    if (fileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage, fileFilter });

// Route for /add-new-product path
router.route('/')
    .get(productController.getProducts)
    .post(validate(productValidation.createProduct),upload.array('files'), productController.createProduct)

router.route('/generatePdf')
    .get(productController.createPdf);

router.route('/:productId')
    .get(productController.getProductById)
    .delete(productController.deleteProductById)
    .patch(productController.updateProductById)

module.exports = router;

// (req,res,next) => {
//     const {value,error} = productValidation.createProduct.validate(req.body, {abortEarly: false});
//     if(error) {
//         console.log("Error: ",error);
//     } else {
//         console.log("Value: ",value);
//     }
//     next();
// }