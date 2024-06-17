const express = require('express');
const { getAth, protect } = require('../controllers/authController');
const { signup, login, resendEmailVerification, logout, verifySMS, resendSMS, verifyUserAccount, forgetUserPassword, resetUserPassword } = require('../controllers/userController');
const router = express.Router();

// Auth Request //
router.route('/hive/authRequest').get(getAth)

// Authentication //
router.route('/hive/user/signup').post(signup)
router.route('/hive/user/login').post(login)
router.route('/hive/user/forgot-password').post(forgetUserPassword)
router.route('/hive/user/reset-password').post(resetUserPassword)
router.route('/hive/user/verify-account').post(protect, verifyUserAccount)
router.route('/hive/user/resend/email-verification').get(protect, resendEmailVerification)

// SMS Verification //
router.route('/hive/user/verify-sms').post(protect, verifySMS)
router.route('/hive/user/resend-sms').get(protect, resendSMS)

// Reset Password //

// Logout User
router.route('/hive/logout').delete(logout)

module.exports = router