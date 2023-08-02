const express = require('express');
const router = express.Router();

// Routes
const productRouter = require('./product.route');

const routes = [
    {
        path: '/product',
        router: productRouter
    }
]


routes.forEach((route) => {
    router.use(route.path,route.router);
})

module.exports = router;