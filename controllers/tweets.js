const models = require('../models/index')
const Tweet = models.Tweet
const Hashtag = models.Hashtag
const Tweethashtag = models.Tweethashtag
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

  const t = await sequelize.transaction()
  try {
    const tweet = await Tweet.create({
      userId: 1, 
      text, 
      prevTweetId,
    })

    const arrayHashtags = extractUtils.extractHashtags(text)
    const foundHashtags = await Hashtag.findAll({
      where: {
        name: arrayHashtags.map(el => el.name)
      }
    })
    const foundHashtagsNames = foundHashtags.map(hashtag => hashtag.name)
    const notFoundHashtags = arrayHashtags.filter(hashtag => !(foundHashtagsNames.includes(hashtag.name)))
    console.log("NotFoundHashtags------------------------------",notFoundHashtags)
    const buildedHashtags = await Hashtag.bulkCreate(notFoundHashtags)
    console.log("BuildedHashtahs-------------------------------",buildedHashtags)
    console.log("Found Hashtags--------------------------------",foundHashtags)
    const allHashtags = [...buildedHashtags, ...foundHashtags]
    console.log("ALL HASHTAGS------------------------------------", allHashtags.map(el => el.name)) //undefined name=ul
    const result = allHashtags.map(hashtag => Tweethashtag.build({ tweetId: tweet.id , hashtagId: hashtag.id }))
    const tweetHashtag = await Tweethashtag.bulkInsert(result)

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