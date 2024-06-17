const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const User = require('../models/userModel')


exports.protect = async (req, res, next) => {
  try {
    if (req.headers?.authorization && req.headers?.authorization?.startsWith('JWT')) {
      //verify the token
      const token = req.headers?.authorization?.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      //find user in DB using 
      const user = await User.findById({ _id: decoded.id }).select('-__v -createdAt');

      if (!user) {
        throw Error('User account does not exit. Please signup')
      }
      // add user object to the req
      req.user = user;

      next();

    } else {
      //throw an errow
      throw Error('You are not logged in. Please login to gain access')
    }

  } catch (error) {
    res.status(401).json({
      status: 'failed',
      error,
      message: error.message
    })
  }
}


exports.getAth = async (req, res) => {
  try {
    if (req.cookies.uid_jwt) {
      //verify the token
      const decoded = jwt.verify(req.cookies.uid_jwt, process.env.JWT_SECRET);
      if (!decoded) throw Error('Sorry, your session has expired. Please login')

      //find user in DB using
      const user = await User.findById({ _id: decoded.id }).select("-__v -createdAt");

      //send res to client
      res.status(200).json({
        status: "user found",
        data: user,
      });

    } else {
      //send res to client
      res.status(200).json({
        status: "no user found",
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "failed",
      error,
      message: error.message,
    });
  }
}