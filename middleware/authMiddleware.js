const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {

  const token = req.cookies.token
  if(!token){
    return res.status(401).json({ message: 'No token' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded   // now you can use req.user.id
    next()
  } catch (err) {
    if(err.name === 'TokenExpiredError'){
      return res.status(401).json({ message: 'Token expired' })
    }
    return res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = protect