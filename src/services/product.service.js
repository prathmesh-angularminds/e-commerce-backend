const fileService = require('./file.service');
const {Product} = require('./../models/index');
const ApiError = require('./../utils/apiError');
const {uploadMultipleFile} = require('./../utils/uploadFile');
const httpStatus = require('http-status');
/**
 * Create New Product
 * @param {Object} product 
 * @returns promise<new product created>
 */
const createProduct = (product) => {

    return uploadMultipleFile(product.images).then((res) => {
        return fileService.addFiles(res);
    }).then((res) => {
        product.images = res;
        return Product.create(product);
    }).catch((err) => {
        new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Invalid images")
    });
}

const getProducts = () => {

    return Product.find();
}

/**
 * Gets product by id
 * @param {ObjectId} productId 
 * @returns promise<product>
 */
const getProductById = (productId) => {
    
    return Product.findById(productId).populate("images");
}

/**
 * 
 * @param {ObjectId} productId 
 * @param {Object} updateBody 
 * @returns success object
 */
const updateProductById = async (productId, updateBody) => {
    
    const product = await getProductById(productId);

    // If product is undefined
    if(!product) {
        throw new ApiError(httpStatus.NOT_FOUND,"Product not found !!!");
    }

    Object.assign(product,updateBody)
    
    await product.save();
    return {
        code: httpStatus.OK,
        message: "Product updated successfully !!!"
    }
}

// Delete product by id
const deleteProductById = async (productId) => {

    const product = getProductById(productId);

    // If product is undefined
    if(!product) {
        throw new ApiError(httpStatus.NOT_FOUND,"Product not found !!!");
    }

    // Remove product by id
    await Product.findByIdAndDelete(productId);
    return {code: httpStatus.OK,message: "Product deleted successfully !!!"};
}

// Delete product image by id
const deleteProductImageById = async(productId,imageId) => {

    const product = await getProductById(productId);
    
}

module.exports = {
    createProduct,
    updateProductById,
    getProductById,
    getProducts,
    deleteProductById,
    deleteProductImageById
}
