require('dotenv').config()
const app = require('./app');
const mongoose = require('mongoose');


// Connecting database
mongoose.connect(`${process.env.MONGODB_URL}`).then(() => {
    console.log("Connected to database successfully")
    app.listen(8080)
}).catch((error) => {
    console.log("Failed to connect database !!!")
})