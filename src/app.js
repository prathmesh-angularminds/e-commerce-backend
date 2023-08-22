const express = require('express');
const app = express();
const { errorHandler } = require('./middleware/error')
const bodyParser = require('body-parser');
const cors = require('cors')
const httpStatus = require('http-status')
const catchAsync = require('./utils/catchAsync');
const router = require('./routes/index')
require('dotenv').config()

app.use(cors({ origin: '*' }));
app.use(bodyParser.json())

app.use('/api',router)

app.use(catchAsync((req,res,next) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Internal server error !!!")
}))

// error handler
app.use(errorHandler)

module.exports = app

