const jwt = require('jsonwebtoken')
const CustomError = require('../errors/custom-error')

const autheficationMiddleware = async (req, res, next) => {
   const authHeader = req.headers.authorization

   if(!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomError('Not token provided ', 401)
   }

   const token = authHeader.split(' ')[1]
   
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const {id, username} = decoded
      req.user = {id, username}
      next()
   } catch(error) {
      throw new CustomError('Not authorizate to access this token', 401)
   }
}

module.exports = autheficationMiddleware