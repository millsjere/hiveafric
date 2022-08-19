const mongoose = require('mongoose')
const Slugify = require('slugify')


const categorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Category must belong to a user']
    },
    name: {
        type: String,
        required: [true, 'Category must have a name'],
        unique: true
    },
    slug: {
        type: String
    },
    parent: {
        type: String
    }
},{
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
})

categorySchema.pre('save', function(next){
    this.slug = Slugify(this.name, {lower: true, trim: true})
    next()
})

const Category = new mongoose.model('Category', categorySchema)
module.exports = Category