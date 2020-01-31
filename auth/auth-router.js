const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("./auth-model");
const makeToken = require("./token-helper");

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  const hashPass = bcrypt.hashSync(password, 10);

  const securedData = {
    username,
    password: hashPass
  };

  Users.add(securedData)
    .then(user => {
      res.status(201).json({ message: `Thank you ${user.username}, your account was successfully created`});
    })
    .catch(err => {
      res.status(500).json({ message: "Unexpected server error" });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then(usr => {
      if (usr && bcrypt.compareSync(password, usr.password)) {
        const token = makeToken(usr);

        res.status(200).json({
          message: `Welcome ${usr.username}`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Unexpected server error" });
    });
});

module.exports = router;
