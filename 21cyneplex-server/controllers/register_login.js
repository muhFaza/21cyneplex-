const { User } = require("../models");
const Helper = require("../helpers");
const { OAuth2Client } = require("google-auth-library");

const googleLogin = async (req, res, next) => {
  try {
    const client = new OAuth2Client();
    if (!req.headers.google_token) throw { name: "NoGoogleToken" };
    const ticket = await client.verifyIdToken({
      idToken: req.headers.google_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const [user, created] = await User.findOrCreate({
      where: {
        email: ticket.getPayload().email,
      },
      defaults: {
        username: ticket.getPayload().name,
        email: ticket.getPayload().email,
        password: Helper.generateOTP(),
        JWTkey: Helper.generateOTP(),
      },
    });
    console.log(user, created, 'googlelogin');

    const access_token = Helper.signToken({id: user.id, email: user.email, username: user.username}, user.JWTkey);
    if (created) {
      res.status(201).json({ access_token });
    } else {
      res.status(200).json({ access_token });
    }
  } catch (err) {
    next(err);
  }
}

const register = async (req, res, next) => {
  try {
    const JWTkey = Helper.generateOTP();
    const { username, email, password } = req.body;
    console.log(username, email, password, JWTkey);
    const userData = await User.create({ username, email, password, JWTkey });
    res
      .status(201)
      .json({
        id: userData.id,
        username: userData.username,
        email: userData.email,
      });
  } catch (err) {
    next(err);
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw { name: "LoginInvalidInput" };
    }
    const userData = await User.findOne({ where: { email } });
    if (!userData) {
      throw { name: "LoginUserNotFound" };
    } else {
      const comparePassword = Helper.comparePassword(
        password,
        userData.password
      );
      if (!comparePassword) {
        throw { name: "LoginInvalidPassword" };
      } else {
        const access_token = Helper.signToken(
          {
            id: userData.id,
            email: userData.email,
            username: userData.username,
          },
          userData.JWTkey
        );
        res.status(200).json({ access_token });
      }
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, googleLogin };