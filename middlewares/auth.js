import jwt from 'jsonwebtoken';
import auth from '../config/auth';

export default (req, res, next) => {

  const tokenConfig = auth.token || {};
  const authorization = req.headers['authorization'];
  let userAuth = {};

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    const token = authorization ? authorization.split(' ')[1] : false;
    if (!token) {
      userAuth = {};
    }
    try {
      userAuth = jwt.verify(token, tokenConfig.secret);
      req.user = userAuth;
      next();
    } catch(err) {
      if (err && err.name === 'TokenExpiredError') {
        return res.json({success: false, message: 'Token has expired at ' + err.expiredAt});
      } else {
        return res.json({success: false, message: 'Invalid token'});
      }
    }
  } else {
    return res.json({success: false, message: 'Unauthorized access!'});
  }
}