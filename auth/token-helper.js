const jwt = require("jsonwebtoken");

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
    process.env.JWT_SECRET || "it rains, it shines. It smokes not.",
    options
  );

  return token;
}

module.exports = makeToken;