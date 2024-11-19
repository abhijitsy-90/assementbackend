const jwt = require('jsonwebtoken');
const secret = process.env.SECRETKEY || "default";                                                                                                                                                                                                                 
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Missing access token' });
  }
   jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid access token' });
    }
   req.user = decodedToken;
    next();
  });
};


module.exports={authenticate}