const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(403).json({ msg: 'Token is not valid' });
    }
  };

  
module.exports={jwtMiddleware}