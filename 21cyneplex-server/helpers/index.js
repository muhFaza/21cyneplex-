const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const jwtDecode = require("jwt-decode");

otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

class Helper {
  static hashPassword(password) {
    return bcrypt.hashSync(password, 12);
  }

  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  static signToken(payload, jwtkey) {
    return jwt.sign(payload, jwtkey, { expiresIn: "1d" });
  }

  static verifyToken(token, jwtkey) {
    return jwt.verify(token, jwtkey, { expiresIn: "1d" });
  }

  static generateOTP() {
    return otpGenerator.generate(32, {});
  }

  static decodeJwt(token) {
    const decoded = jwtDecode(token);
    return decoded;
  }
}
// console.log(Helper.generateOTP());
// console.log(
//   Helper.decodeJwt(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJmYXphMkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZhemEyIiwiaWF0IjoxNjk4MDgyNTIzLCJleHAiOjE2OTgxNjg5MjN9.zBZl1VrDZT-FB-dxBgBLi-H35wwA9TfCOYz3oT7SCl8"
//   )
// );
module.exports = Helper;
