const {Product} = require('./../models/index')

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
 * @returns updatedProduct
 */
const updateProductById = async (productId, updateBody) => {
    
    const product = await getProductById(productId);

    // If product is undefined
    if(!product) {
        return {message: "Product not found !!!"}
    }

    Object.assign(product,updateBody)
    console.log(product,updateBody)
    const updatedProduct = await product.save();
    return updatedProduct
}

// Delete product by id
const deleteProductById = async (productId) => {

    const product = getProductById(productId);

    // If product is undefined
    if(!product) {
        return {message: "Product not found !!!"}
    }

    // Remove product by id
    Product.findByIdAndDelete(productId);
    return product;
}

module.exports = {
    createProduct,
    updateProductById,
    getProductById,
    getProducts,
    deleteProductById
}
