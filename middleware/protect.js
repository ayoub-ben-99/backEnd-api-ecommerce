const jwt = require('jsonwebtoken');
const user = require('../model/user');

/**
 * @middleware protect
 * @desc Middleware to verify JWT token and check for admin access
 */
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    req.user = await user.findById(decoded.userId).select('-password');
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = protect;
