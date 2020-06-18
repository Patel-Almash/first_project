import jwt from 'jsonwebtoken';
/**
 * Authenticator
 */
class Authenticator {
  static init({config}) {
    this.config = config;
  }

  static token({role, user}) {
    const tokenConfig = this.config.token || {};
    if (!tokenConfig.secret) {
      throw 'Secret for signing JWT not specified in Auth config (auth.js)'
    }
    const token = jwt.sign({role, user}, tokenConfig.secret, tokenConfig.options);
    return token;
  }

  static getUser(req) {
    const tokenConfig = this.config.token || {};
    const authorization = req.headers['authorization'];
    let isValidToken = true, tokenError = null;
    let userAuth = {};

    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      const token = authorization ? authorization.split(' ')[1] : false;
      if (!token) {
        userAuth = {};
      }
      try {
        userAuth = jwt.verify(token, tokenConfig.secret);
      } catch(err) {
        if (err && err.name === 'TokenExpiredError') {
          tokenError = 'Token has expired at ' + err.expiredAt;
        } else {
          tokenError = 'Invalid token.';
        }
        isValidToken = false;
      }
    }

    return {user: userAuth, status: isValidToken, error: tokenError};
  }
}

export default Authenticator;