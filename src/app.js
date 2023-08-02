const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const router = require('./routes/index')

app.use(bodyParser.json())

app.use('/api',router)

module.exports = app;