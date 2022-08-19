const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const crypto = require('crypto');
const { registerMessage } = require('../mailer/templates');
const sgMail = require('@sendgrid/mail')
const { sendSMS } = require('../sms/twilio')

const hashPassword = async(password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}



// USER SIGNUP
exports.signup = async (req, res) => {
    try {
      //chech if username and email has been taken
      const { firstname,lastname, email, phone, company,industry, password } = req.body;
      const newPassword = await hashPassword(password);
  
      const user = await User.create({
        firstname,lastname, email, phone, company,industry,
        password: newPassword,
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
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: user.email,
        from: "Hive Afrika <noreply@hiveafrika.com>",
        subject: "Welcome to HiveAfrika",
        html: registerMessage(
          req,
          "Hive Afrika",
          user.firstname,
          "To complete your registration process, use the code below to activate your account. Please ignore this email if you did not register with Hive Afrika",
          activationToken
        ),
      };
      await sgMail.send(msg);
  
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

  // VERIFY USER EMAIL 
  exports.verifyUserEmail = async(req, res) => {
    try {
        if(req.user.isEmailVerified){
            // send response to user
            res.status(200).json({
                status : "email verified",
                data: req.user
            });
            return
        }
        
        //check the token
        const token = crypto.createHash('sha256').update(req.body.token).digest('hex');
        const user = await User.findOne({emailVerificationToken : token})

        if(!user) throw Error('No user account found, please signup')
        
        // activate user account
        user.isEmailVerified = true
        user.emailVerificationToken = undefined
        await user.save()

        //send res to client
        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            error: error,
            message: error.message,
          });
    }
  }
  
  // RESEND VERIFICATION EMAIL
  exports.resendEmailVerification = async (req, res) => {
    try {
      const user = await User.findById({ _id: req.user.id });
      if (!user) {
        throw Error("Sorry, no user found. Please login");
      }
  
      const activationToken = user.activateEmail();
      await user.save()
      
      // send email to user
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: `${user.email}`, // Change to your recipient
        from: "Hive Afrika <noreply@hiveafrika.com>", // Change to your verified sender
        subject: "Welcome to Hive Afrika",
        html: registerMessage(
          req,
          "Hive Afrika",
          user.firstname,
          "To complete your registration process, use the code below to activate your account. Please ignore this email if you did not register with Hive Afrika",
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
      const { email, password  } = req.body;
  
      // find user using email
      const user = await User.findOne({ email }).select("+password");
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

        //send SMS code
        const smsCode = Math.floor(Math.random() * 999999)
        user.verificationCode = smsCode
        await user.save()
        await sendSMS(user.phone, smsCode)
  
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

  // SMS VERIFY //
  exports.verifySMS = async(req, res) => {
    try {
      const user = await User.findOne({verificationCode: req.body.token}) 
      if(!user) throw Error('Sorry, no user account found')

      user.verificationCode = undefined
      await user.save()

      //res to client
      res.status(200).json({
        status: "success",
        data: user,
      });

    } catch (error) {
      res.status(400).json({
        status: "failed",
        error: error,
        message: error.message,
      });
    }
  }

  exports.resendSMS = async(req, res) => {
    try {
      const user = await User.findById(req.user.id)
      
      //send SMS code
      const smsCode = Math.floor(Math.random() * 999999)
      user.verificationCode = smsCode
      await user.save()
      await sendSMS(user.phone, smsCode)

      //res to client
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
  }

  // LOGOUT USER
  exports.logout = async(req, res) => {
    try {
        res.clearCookie("uid_jwt");

        res.status(200).json({
        status: "success",
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            error: error,
            message: error.message,
          });
    }
  }