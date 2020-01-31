const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("./auth-model");

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  const hashPass = bcrypt.hashSync(password, 10);

  const securedData = {
    username,
    password: hashPass
  };

  Users.add(securedData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "Unexpected server error" });
    });
});

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;
