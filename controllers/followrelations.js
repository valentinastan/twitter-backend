const models = require('../models/index')
const User = models.User
const Followrelation = models.Followrelation
const sequelize = models.sequelize

exports.index = async (req, res, next) => {
  const relations = await Followrelation.findAll()

  res.status(200).json(relations)
}

exports.create = async (req, res, next) => {
  const {
    followedId,
  } = req.body

  console.log("lllaaaaaaaaaaaaaaaaaaaa", Followrelation)
  const followrelation = await Followrelation.create({ followerId: req.userId, followedId })

  res.status(200).json(followrelation)
}