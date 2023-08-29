const ApiError = require('../utils/apiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('./../services/index')
const httpStatus = require('http-status');

// Create a product
const createProduct = catchAsync(async (req,res) => {
    
    const product = Object.assign(req.body,{
        createdAt: new Date(),
        images: req.files
    });

    const newProduct = await productService.createProduct(product);
    res.status(httpStatus.CREATED).send(newProduct)
})

// Get products
const getProducts = catchAsync(async (req,res) => {

    const products = await productService.getProducts();
    res.status(httpStatus.OK).send(products);
})

// Get a product by id
const getProductById = catchAsync(async (req,res) => {

    const product = await productService.getProductById(req.params.productId);

    // If product not found 
    if(!product) {
        throw new ApiError(400,"Product not found !!!");
    }

    res.status(httpStatus.OK).send(product)
});

const updateProductById = async (req,res) => {
    
    const result = await productService.updateProductById(req.params.productId,req.body)
    res.status(httpStatus.OK).send(result);
}

const deleteProductById = async (req,res) => {
    const product = await productService.deleteProductById(req.params.productId)
    res.status(200).send(product);
}

const deleteProductImageById = async (req,res) => {

    productService.deleteProductImageById(req.query.productId,req.query.imageId);
}

module.exports = {
    createProduct,
    getProductById,
    getProducts,
    updateProductById,
    deleteProductById,
    deleteProductImageById
}