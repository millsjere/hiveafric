const mongoose = require('mongoose');
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Please provide a username']
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Please provide a valid email']
    },
    password: {
        type: String,
    },
    phone: {
        type: String
    },
    emailVerificationToken: String,
    isEmailVerified: { type: Boolean, default: false},
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

// INSTANCE METHOD - Made available on user doc after db query
userSchema.methods.activateEmail = function () {
    const activationToken = crypto.randomBytes(32).toString("hex");
    this.emailVerificationToken = crypto
      .createHash("sha256")
      .update(activationToken)
      .digest("hex");
  
    return activationToken;
  };

const User = mongoose.model('User', userSchema)
module.exports = User