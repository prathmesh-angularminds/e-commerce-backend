const ApiError = require('../utils/apiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('./../services/index')
const httpStatus = require('http-status');
const handlebars = require('handlebars');
const puppeteer = require('puppeteer');
const fs = require('fs')

// Create a product
const createProduct = catchAsync(async (req, res) => {

    // createPdf();

    const product = Object.assign(req.body, {
        createdAt: new Date(),
        images: req.files
    });

    const newProduct = await productService.createProduct(product);
    res.status(httpStatus.CREATED).send(newProduct)
})

// Get products
const getProducts = catchAsync(async (req, res) => {

    const products = await productService.getProducts();
    res.status(httpStatus.OK).send(products);
})

// Get a product by id
const getProductById = catchAsync(async (req, res) => {

    const product = await productService.getProductById(req.params.productId);

    // If product not found 
    if (!product) {
        throw new ApiError(400, "Product not found !!!");
    }

    res.status(httpStatus.OK).send(product)
});

const updateProductById = async (req, res) => {

    const result = await productService.updateProductById(req.params.productId, req.body)
    res.status(httpStatus.OK).send(result);
}

const deleteProductById = async (req, res) => {
    const product = await productService.deleteProductById(req.params.productId)
    res.status(200).send(product);
}

const deleteProductImageById = async (req, res) => {

    productService.deleteProductImageById(req.query.productId, req.query.imageId);
}

const createPdf = catchAsync(async(req,res) => {

    const template = handlebars.compile("<p>Name: {{name}}</p>");
    const finalHtml = template({ name: "Prathamesh" });

    const filePath = `images/demo${Math.random()}.pdf`;
    const options = {
        format: "A4",
        headerTemplate: "<p></p>",
        footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        printBackground: true,
        margin: { left: 15, right: 15, top: 15, bottom: 20 },
        path: filePath,
    };

    const browser = await puppeteer.launch({
        args: ["--no-sandbox"],
        headless: true,
        headless: "new",
    });
    const page = await browser.newPage();
    await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`, {
        waitUntil: "networkidle0",
    });
    await page.pdf(options);
    await browser.close();
    var data = fs.readFileSync(filePath);

    console.log("Final template:", finalHtml);
    console.log("Final template:", data);
    res.send(data);
    // return data;
})

module.exports = {
    createProduct,
    getProductById,
    getProducts,
    updateProductById,
    deleteProductById,
    deleteProductImageById,
    createPdf
}