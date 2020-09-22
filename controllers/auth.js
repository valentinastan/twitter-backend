const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models/index')
const User = models.User

exports.signUp = async (req, res, next) => {
  const {
    username,
    email,
    password,
  } = req.body

  const hashPass = await bcrypt.hash(password, 12)
  const createdUser = await User.create({ username: username, email: email, password: hashPass })

  const token = jwt.sign(
    {
      id: createdUser.id,
    },
    'super-secret',
    { expiresIn: '1h' }
  )

  res.status(201).json({...createdUser, token})
}

exports.login = async (req, res, next) => {
  const {
    email,
    password
  } = req.body

  const user = await User.findOne({ where: {email: email} })
  if (!user) {
    res.status(404).json("User Not Found!")
  }
  validPass = await bcrypt.compare(password, user.password)
  if (!validPass) {
    res.status(404).json("Wrong password!")
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    'super-secret',
    { expiresIn: '1h' }
  )

  res.status(200).json({...user, token})
}