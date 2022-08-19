const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Category must belong to a user']
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        reqular: { type: Number, required: true},
        sales: {type: Number }
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true
    },
    images: [
        {type: String}
    ],
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String
    },
    tags: [
        {type: String}
    ],
    inStock: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        enum: ['Published', 'Drafted'],
        default: 'Published'
    }

},{
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
})

const Product = new mongoose.model('Product', productSchema)
module.exports = Product