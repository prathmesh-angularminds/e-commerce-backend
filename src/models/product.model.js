const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
    },
    createdAt: {
        type: Date,
    },
    images: [{
        public_id: {
            type: String,
        },
        url: {
            type: String
        }
    }],
    hasOffer: {
        type: Boolean,
    },
})

const Product = mongoose.model('product',productSchema)

module.exports = Product