const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.get('Authorization')
  let decodedToken

  try {
    decodedToken = jwt.verify(token, 'super-secret')
  } catch (err) {
    err.statusCode = 500
    err.errorArray = []
    throw err
  }

  if(!decodedToken) {
    res.status(401).json("Not authenticated!")
  }

  req.userId = decodedToken.id
  next()
}