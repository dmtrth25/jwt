const jwt = require('jsonwebtoken')
const { UnauthicateError } = require('../errors')

const autheficationMiddleware = async (req, res, next) => {
   const authHeader = req.headers.authorization

   if(!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthicateError('Not token provided ')
   }

   const token = authHeader.split(' ')[1]
   
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const {id, username} = decoded
      req.user = {id, username}
      next()
   } catch(error) {
      throw new UnauthicateError('Not authorizate to access this token')
   }
}

module.exports = autheficationMiddleware