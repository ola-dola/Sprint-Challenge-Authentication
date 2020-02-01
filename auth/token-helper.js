const jwt = require("jsonwebtoken");
const secrets = require('../config/secrets');

function makeToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  const token = jwt.sign(
    payload,
    secrets.jwtSecret,
    options
  );

  return token;
}

module.exports = makeToken;