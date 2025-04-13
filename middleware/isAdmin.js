 const isAdmin = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'you are not an admin' });
    }
  
    if (req.user.isAdmin) {
      next(); 
    } else {
      res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  };
  module.exports = isAdmin