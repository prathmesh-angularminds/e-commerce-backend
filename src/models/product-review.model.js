const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const productReviewSchema = new mongoose.Schema({
    _org: {
        type: ObjectId,
        ref: 'organization'
    },
    _productId: {
        type: ObjectId,
        ref: 'product'
    },
    _customerId: {
        type: ObjectId,
        red: 'customer'
    },
    reviewTitle: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
    },
    reviewComment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})

const ProductReview = mongoose.model('product-review',productReviewSchema)

module.exports = ProductReview