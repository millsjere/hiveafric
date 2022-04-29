const express = require('express');
const { getAth, protect, signup, login } = require('../controllers/authController');
const router = express.Router();

// get Auth
router.route('/hive/request').get(getAth)

// Authentication //
router.route('/hive/signup').post(signup)
router.route('/hive/login').post(login)



module.exports = router