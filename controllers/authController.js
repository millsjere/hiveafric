const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const crypto = require('crypto');
const { registerMessage } = require('../mailer/templates');

const hashPassword = async(password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}

exports.protect = async(req, res, next) => {
    try {
        if (req.cookies.uid_jwt) {
            //verify the token
            const decoded = jwt.verify(req.cookies.uid_jwt, process.env.JWT_SECRET);
      
            //find user in DB using
            const user = await User.findById({ _id: decoded.id }).select(
              "-__v -createdAt"
            );
      
            if (!user) {
              throw Error("Sorry, the user no longer exits. Please signup");
            }
            // add user object to the req
            req.user = user;
            next();

          } else {
            //throw an errow
            throw Error("You are not logged in. Please login to gain access");
          }

    } catch (error) {
        res.status(401).json({
            status: 'failed',
            error,
            message: error.message
        })
    }
}


exports.getAth = async(req, res) => {
    try {
        if (req.cookies.uid_jwt) {
          //verify the token
          const decoded = jwt.verify(req.cookies.uid_jwt, process.env.JWT_SECRET);
    
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

// USER SIGNUP
exports.signup = async (req, res) => {
  try {
    //chech if username and email has been taken
    const { username, email, password } = req.body;
    const newPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: newPassword,
      emailVerificationToken: crypto.randomBytes(64).toString("hex"),
      isEmailVerified: false,
    });

    if (!user) {
      throw Error("Something went wrong. Please try again");
    }

    // sign token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    const activationToken = user.activateEmail();
    await user.save();

    // send token to browser //
    res.cookie("uid_jwt", token, {
      expires: new Date(Date.now() + 5 * 60 * 60 * 1000),
      httpOnly: true,
    });

    //send email to new register user
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // const msg = {
    //   to: user.email,
    //   from: "Amaly Admin <codes@focusppc.com>",
    //   subject: "Welcome to Amalyapp",
    //   html: registerMessage(
    //     req,
    //     "You're on your way! <br>Let's confirm your email address.",
    //     "To complete your registration process, use the code below to activate your account. Please ignore this email if you did not register with Amaly",
    //     user.username,
    //     activationToken
    //   ),
    // };
    // await sgMail.send(msg);

    //send res to client
    res.status(200).json({
      status: "success",
      data: user,
    });

  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error,
      message: error.message,
    });
  }
};

// RESEND VERIFICATION EMAIL
exports.resendVerificationEmail = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });
    if (!user) {
      throw Error("Sorry, no user found. Please login");
    }

    // send email to user
    const activationToken = user.activateEmail();
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: `${user.email}`, // Change to your recipient
      from: "Hive Africa <connect@hiveafric.com>", // Change to your verified sender
      subject: "Welcome to the HIVE",
      html: registerMessage(
        req,
        "You're on your way! <br>Let's confirm your email address.",
        "By clicking on the following link, you are confirming your email address. Please ignore this email if you did not register with WePayGh",
        user.username,
        activationToken
      ),
    };

    await sgMail.send(msg);

    // send res to client
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      error: error,
      message: error.message,
    });
  }
};

// LOGIN USER
exports.login = async (req, res, next) => {
  try {
    const { password  } = req.body;
   const username = req.body.username[0].toUpperCase() + req.body.username.substring(1).toLowerCase();

    // find user using email
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      throw Error("Invalid user credentials");
    }
    if (!user.isEmailVerified) {
      throw Error("Email is not verified. Please check your email");
    }

    // verify password
    const verified = await bcrypt.compare(password, user.password);
    if (verified) {
      // sign token
      let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "5h",
      });

      // save tokenExpiry in DB and
      user.tokenExpiry = new Date(Date.now() + 5 * 60 * 60 * 1000);
      user.save();

      // send token to browser //
      res.cookie("uid_jwt", token, {
        expires: new Date(Date.now() + 5 * 60 * 60 * 1000),
        httpOnly: true,
      });

      //send res to client
      res.status(200).json({
        status: "success",
        data: user,
      });
    } else {
      throw new Error("Invalid user credentials");
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error,
      message: error.message,
    });
  }
};