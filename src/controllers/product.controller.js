const ApiError = require('../utils/apiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('./../services/index')

const createProduct = async (req,res) => {
    
    const product = Object.assign(req.body,{
        createdAt: new Date()
    });

    const newProduct = await productService.createProduct(product);
    res.status(200).send(newProduct)
}

// Get products
const getProducts = async (req,res) => {

    const products = await productService.getProducts();
    console.log(products)

    res.status(200).send(products);
}

// Get a product by id
const getProductById = catchAsync(async (req,res) => {

    const product = await productService.getProductById(req.params.productId);

    if(!product) {
        // res.status(400).send(product)
        throw new ApiError(400,"Product not found");
    }

    res.status(200).send(product)
});

const updateProductById = async (req,res) => {
    
    const product = await productService.updateProductById(req.params.productId,req.body)
    res.status(200).send(product);
}

const deleteProductById = async (req,res) => {
    console.log("Delete");
    const product = await productService.deleteProductById(req.params.productId)
    res.status(200).send(product);
}

module.exports = {
    createProduct,
    getProductById,
    getProducts,
    updateProductById,
    deleteProductById
}