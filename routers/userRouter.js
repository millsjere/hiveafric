const express = require('express');
const { getAth, protect } = require('../controllers/authController');
const { signup, login, verifyUserEmail, resendEmailVerification, logout, verifySMS, resendSMS } = require('../controllers/userController');
const router = express.Router();

// Auth Request //
router.route('/hive/authRequest').get(getAth)

// Authentication //
router.route('/hive/signup').post(signup)
router.route('/hive/login').post(login)
router.route('/hive/verifyUser').post(protect, verifyUserEmail)
router.route('/hive/resendEmailVerification').get(protect, resendEmailVerification)

// SMS Verification //
router.route('/hive/verifySMS').post(protect, verifySMS)
router.route('/hive/resendSMS').get(protect, resendSMS)

// Reset Password //

// Logout User
router.route('/hive/logout').delete(logout)

module.exports = router