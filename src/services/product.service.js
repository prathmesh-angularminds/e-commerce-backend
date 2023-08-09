const {Product} = require('./../models/index');
const ApiError = require('./../utils/apiError');
const catchAsync = require('./../utils/catchAsync');
const httpStatus = require('http-status');

/**
 * Create New Product
 * @param {Object} product 
 * @returns promise<new product created>
 */
const createProduct = (product) => {

    return Product.create(product)
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
    
    return Product.findById(productId);;
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

module.exports = {
    createProduct,
    updateProductById,
    getProductById,
    getProducts,
    deleteProductById
}
