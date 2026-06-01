
const isAdmin = (req, res, next) => {
   if(!req.user){
    return res.status(401).json({ message: "Unauthorized" })
   }
    
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Admin can only create, delete and update jobs",
      });
    }
  
    next();
  };
  
  module.exports = isAdmin;