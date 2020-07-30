const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.js');

router.get('/signUp', authController.signUp)
router.get('/login', authController.login)


module.exports = router