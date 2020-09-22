const express = require('express');
const router = express.Router();

const followrelationsController = require('../controllers/followrelations');

router.post('/follow', followrelationsController.create)

module.exports = router