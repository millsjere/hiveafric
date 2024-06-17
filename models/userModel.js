const mongoose = require('mongoose');
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please provide a firstname']
    },
    lastname: {
        type: String,
        required: [true, 'Please provide a lastname']
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Please provide a valid email']
    },
    password: {
        type: String,
        select: false
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    isLoginVerified: { type: Boolean, default: false },
    verificationCode: { type: String, select: false },
    verificationCodeExpiry: { type: Date, select: false },
    isEmailVerified: { type: Boolean, default: false },
    isFirstTime: { type: Boolean, default: true },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

//SENDBACK THE USER OBJECT TO THE CLIENT WITHOUT THE USER PASSWORD
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

// INSTANCE METHOD - Made available on user doc after db query
// userSchema.methods.activateEmail = function () {
//     const activationToken = Math.random().toString(36).slice(2, 8)
//     this.emailVerificationToken = crypto
//         .createHash("sha256")
//         .update(activationToken)
//         .digest("hex");

//     console.log(this.emailVerificationToken)
//     console.log(activationToken)
//     return activationToken;
// };

userSchema.virtual('fullname').get(function () {
    const fullname = this.firstname + " " + this.lastname
    return fullname
})

// DOCUMENT MIDDLEWARE //
userSchema.pre("save", function (next) {
    this.firstname =
        this.firstname[0].toUpperCase() +
        this.firstname.substring(1).toLowerCase();

    this.lastname =
        this.lastname[0].toUpperCase() +
        this.lastname.substring(1).toLowerCase()

    next();
});

// Virtuals
userSchema.virtual('categories', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'user'
});

userSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'user'
});

const User = mongoose.model('User', userSchema)
module.exports = User