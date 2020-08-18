const express = require('express');
const router = express.Router();

const tweetsController = require('../controllers/tweets.js');

router.get('/tweets', tweetsController.index)
router.get('/tweet/:id', tweetsController.show)
router.post('/tweet', tweetsController.create)
router.post('/tweetDel/:id', tweetsController.delete)

module.exports = router