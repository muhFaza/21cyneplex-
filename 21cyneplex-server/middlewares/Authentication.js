const Helper = require('../helpers');
const { User } = require('../models');
async function Authentication (req, res, next) {
  try {
    if (!req.headers.access_token) {
      throw {name: 'NoTokenFound'}
    } else {
      const { access_token } = req.headers;
      const decoded = Helper.decodeJwt(access_token);
      const userData = await User.findOne({ where: { email: decoded.email, id: decoded.id } });
      const payload = Helper.verifyToken(access_token, userData.dataValues.JWTkey);

      if (!userData) {
        throw {name: "UserNotFound"}
      } else {
        req.user = {
          id: payload.id,
          email: payload.email,
          username: payload.username,
        };
        next();
      }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = Authentication