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
// app.use(multer({dest: 'images/'}).single('image'))

// console.log("Multer: ",) 
// app.use('/api',router)
app.use('/api',upload.single('image'),(req,res,next) => {
    console.log(req.file);
})

app.use(catchAsync((req,res,next) => {
    console.log("Hello")
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Internal server error !!!")
}))

// error handler
app.use(errorHandler)


module.exports = app;

