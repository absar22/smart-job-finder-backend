const User = require('../models/User')
const jwt = require('jsonwebtoken')

const protect = async (req, res, next) => {

  const token = req.cookies.token
  // console.log('Token from cookie:', token)
  if(!token){
    return res.status(401).json({ message: 'No token' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    req.user = user
    // req.user = decoded   // now you can use req.user.id
    next()
  } catch (err) {
    if(err.name === 'TokenExpiredError'){
      return res.status(401).json({ message: 'Token expired' })
    }
    return res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = protect