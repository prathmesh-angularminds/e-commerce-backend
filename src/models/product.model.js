const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const productSchema = new mongoose.Schema({
    orgId: {
        type: String
    },
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
    productType: {
        type: String
    },
    images: [{
        public_id: {
            type: String,
        },
        url: {
            type: String
        }
    }],
    review: [
        {
            reviewId: ObjectId,
            ref: 'product-review'
        }
    ],
    // productRating: [
    // ]
})

const Product = mongoose.model('product',productSchema)

module.exports = Product