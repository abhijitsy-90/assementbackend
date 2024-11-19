const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1];

//   if (!token) {
//     return res.status(403).json({ message: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRETKEY);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// module.exports = { authenticate };


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