const models = require('../models/index')
const Tweet = models.Tweet
const Hashtag = models.Hashtag
const Tweethashtag = models.TweetHashtag
const sequelize = models.sequelize
const extractUtils = require('../lib/hashtags/extractionUtil')

exports.index = async (req, res, next) => {
  const tweets = await Tweet.findAll()

  res.status(200).json(tweets)
}

exports.create = async (req, res, next) => {
  const {
    text,
    prevTweetId,
  } = req.body

  let tweet
  const t = await sequelize.transaction()
  
  try {
    tweet = await Tweet.create({
      userId: req.userId, 
      text, 
      prevTweetId,
    })

    console.log("backend user id din req", req.userId)

    const arrayHashtags = extractUtils.extractHashtags(text)
    const foundHashtags = await Hashtag.findAll({
      where: {
        name: arrayHashtags.map(el => el.name)
      }
    })
    const foundHashtagsNames = foundHashtags.map(hashtag => hashtag.name)
    const notFoundHashtags = arrayHashtags.filter(hashtag => !(foundHashtagsNames.includes(hashtag.name))).map(hash => hash.toJSON())
    const buildedHashtags = await Hashtag.bulkCreate(notFoundHashtags)
    const allHashtags = [...buildedHashtags, ...foundHashtags]
    const result = allHashtags.map(hashtag => {
      return { hashtagId: hashtag.id, tweetId: tweet.id }
    })
    await Tweethashtag.bulkCreate(result)

    await t.commit()
  } catch (error) {
    console.log('THERE WAS AN ERROR CREATING LIKE', error)
    await t.rollback()
  }

  res.status(200).json(tweet)
}

exports.show = async (req, res, next) => {
  const tweetId = req.params.id

  const tweet = await Tweet.findAll({
    where: {
      id: tweetId
    }
  })

  res.status(200).json(tweet)
}

exports.delete = async (req, res, next) => {
  const {
    id
  } = req.params

  const deletedTweet = Tweet.destroy({
    where: {
      id,
    }
  })

  res.status(204).json(deletedTweet)
}