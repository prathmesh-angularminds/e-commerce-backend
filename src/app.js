const express = require('express');
const app = express();
const { errorHandler } = require('./middleware/error')
const bodyParser = require('body-parser');
const cors = require('cors')
const multer = require('multer');
const httpStatus = require('http-status')
const catchAsync = require('./utils/catchAsync');
const router = require('./routes/index')

const upload = multer({ dest: "images/" })

app.use(cors({ origin: '*' }));
app.use(bodyParser.json())

app.use('/api',router)
// app.use('/api',upload.array('files'),(req,res,next) => {
//     console.log("Headers: ",req.headers);
//     console.log("File: ",req.files);
//     console.log("Body: ",req.body);
// })

app.use(catchAsync((req,res,next) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Internal server error !!!")
}))

// error handler
app.use(errorHandler)


module.exports = app;

