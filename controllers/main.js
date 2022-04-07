
const CustomError = require('../errors/custom-error')

const login = async (req, res) => {
   const {username, password} = req.body
   if(!username || !password) {
      throw new CustomError('Please provide your email or password', 400)
   }
   res.send('Login/Register Route')
}

const dashboard = async (req, res) => {
   const luckyNumber = Math.floor(Math.random() * 100)
   res.status(200).json({msg: `Hello Jone!`, secret: `Here is yout authorizated data and ${luckyNumber}`})
}

module.exports = {
   login,
   dashboard
}